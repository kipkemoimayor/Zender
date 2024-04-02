// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext } from '../../declarations'
import Mambu from '../../mambu'
import { logger } from '../../logger'
import { constants } from '../../contants'
import util from '../../utils'

export const handleSMs = async (context: HookContext) => {
  console.log(`Running hook sms-hook on ${context.path}.${context.method}`)
  const { data, params, app } = context
  const { decodeString } = util

  const mambu = new Mambu()

  const updateCustomFields = (loanId: string, field: { customFieldID: string; value: string }) => {
    const data = {
      customInformation: [
        {
          customFieldID: field.customFieldID,
          value: field.value
        }
      ]
    }
    mambu.updateLoan(loanId, data)
  }

  if (params.headers) {
    const mambuUser = params.headers['mambuuser']

    const loanId = decodeString(mambuUser).OBJECT_ID

    if (loanId && !data.loanId) {
      data.loanId = loanId
    }
  }

  const getGuarantor = (guarantors: any[] = []) => {
    const guarantor = guarantors.filter(
      (guarantor) => guarantor.Gurantor_type_Loan_Accounts == 'Guarantor-1'
    )[0]

    if (guarantor) {
      return guarantor
    } else {
      return guarantors.filter((guarantor) => guarantor.Gurantor_type_Loan_Accounts)[0]
    }
  }

  const queueSms = (localClientData: any, loan: any, smsType: 1 | 2) => {
    app
      .service('sms-queue')
      .create({
        destination: localClientData.guarantorPhoneNumber,
        direction: 'OUT',
        message: util.replaceData(smsType == 1 ? constants.smsOne : constants.smsTwo, {
          clientName: localClientData.fullName
        }),
        sent: false
      })
      .then(() => {
        app
          .service('sms-history')
          .create({
            clientId: localClientData.id,
            status: true,
            type: smsType
          })
          .catch((error) => {
            logger.error(error)
            logger.info('FAILED TO CREATE SMS HISTORY DETAILS:LOCAL-HANDLE-SMS')
          })
      })
      .then(() => {
        updateCustomFields(loan.id, {
          customFieldID: 'send_guarantor_sms',
          value: smsType == 1 ? 'SMS-1' : 'SMS-2'
        })
      })
      .catch((error) => {
        logger.error(error)
        logger.info('FAILED TO CREATE SMS QUEUE DETAILS:LOCAL-HANDLE-SMS')
      })
  }

  const loan = await mambu.getLoan(data.loanId)

  const guarantor = getGuarantor(loan._Gurantor_Loan_Accounts || []) || {}

  switch (data.smsType) {
    case 'DISBURSEMENT':
      // CREATE CLIENT
      const client = await new Mambu().getClient(loan.accountHolderKey)
      app
        .service('client')
        ._create({
          fullName: client.firstName + ' ' + client.lastName,
          phoneNumber: client.mobilePhone,
          guarantorPhoneNumber: guarantor.GP01,
          status: true,
          loanId: loan.id,
          guarantorName: guarantor.Gurantor_Name_Loan_Accounts
        })
        .then((client) => {
          app
            .service('sms-queue')
            .create({
              destination: client.guarantorPhoneNumber,
              direction: 'OUT',
              message: util.replaceData(constants.smsOne, { clientName: client.fullName }),
              sent: false
            })
            .then(() => {
              app
                .service('sms-history')
                .create({
                  clientId: client.id,
                  status: true,
                  type: 1
                })
                .catch((error) => {
                  logger.error(error)
                  logger.info('FAILED TO CREATE SMS HISTORY DETAILS:LOCAL-HANDLE-SMS')
                })
            })
            .then((res) => {
              updateCustomFields(loan.id, {
                customFieldID: 'guarantor_phone_number',
                value: client.guarantorPhoneNumber
              })
              updateCustomFields(loan.id, { customFieldID: 'send_guarantor_sms', value: 'SMS-1' })
            })
            .catch((error) => {
              logger.error(error)
              logger.info('FAILED TO CREATE SMS QUEUE DETAILS:LOCAL-HANDLE-SMS')
            })
        })
        .catch((error) => {
          logger.error(error)
          logger.info('FAILED TO CREATE CLIENT GUARANTOR DETAILS:LOCAL-HANDLE-SMS')
        })
      return context

    case 'ARREARS':
      // fetch client
      const localClient = await app.service('client')._find({
        query: {
          loanId: data.loanId,
          guarantorPhoneNumber: {
            $ne: null as any
          }
        }
      })

      if (!localClient.data.length) {
        const client = await new Mambu().getClient(loan.accountHolderKey)
        let createClient = await app.service('client')._create({
          fullName: client.firstName + ' ' + client.lastName,
          phoneNumber: client.mobilePhone,
          guarantorPhoneNumber: guarantor.GP01,
          status: true,
          loanId: loan.id,
          guarantorName: guarantor.Gurantor_Name_Loan_Accounts
        })

        localClient.data.push(createClient)
      }

      const localClientData = localClient.data[0]

      queueSms(localClientData, loan, 2)

      return context

    case 'SMSONE':
      // fetch client
      const smsOneClient = await app.service('client')._find({
        query: {
          loanId: data.loanId,
          guarantorPhoneNumber: {
            $ne: null as any
          }
        }
      })

      if (!smsOneClient.data.length) {
        const client = await new Mambu().getClient(loan.accountHolderKey)
        let createClient = await app.service('client')._create({
          fullName: client.firstName + ' ' + client.lastName,
          phoneNumber: client.mobilePhone,
          guarantorPhoneNumber: guarantor.GP01,
          status: true,
          loanId: loan.id,
          guarantorName: guarantor.Gurantor_Name_Loan_Accounts
        })

        smsOneClient.data.push(createClient)
      }

      const smsOneData = smsOneClient.data[0]

      queueSms(smsOneData, loan, 1)

      return context

    case 'SMSTWO':
      const smsTwoClient = await app.service('client')._find({
        query: {
          loanId: data.loanId
        }
      })

      if (!smsTwoClient.data.length) {
        const client = await new Mambu().getClient(loan.accountHolderKey)
        let createClient = await app.service('client')._create({
          fullName: client.firstName + ' ' + client.lastName,
          phoneNumber: client.mobilePhone,
          guarantorPhoneNumber: guarantor.GP01,
          status: true,
          loanId: loan.id,
          guarantorName: guarantor.Gurantor_Name_Loan_Accounts
        })

        smsTwoClient.data.push(createClient)
      }

      const smsTwoData = smsTwoClient.data[0]

      queueSms(smsTwoData, loan, 2)

      return context

    default:
      break
  }
}
