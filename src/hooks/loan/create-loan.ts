// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { GeneralError } from '@feathersjs/errors'
import { LoanData } from '../../client'
import type { HookContext } from '../../declarations'
import { logger } from '../../logger'
import Mambu from '../../mambu'

export const createLoan = async (context: HookContext) => {
  console.log(`Running hook create-loan on ${context.path}.${context.method}`)
  const { data, result, app, additionalData } = context

  try {
    const loan = await new Mambu().getLoan(additionalData.loanId)

    // const fRepaymentDat: any = .toISOString()
    const loanSchemData: LoanData = {
      accountId: loan.id,
      clientId: result.id,
      firstRepaymentDate: loan.disbursementDetails.firstRepaymentDate
        ? new Date(loan.disbursementDetails.firstRepaymentDate)
        : new Date(),
      loanName: loan.loanName,
      mambuImei: additionalData.imei,
      status: loan.accountState,
      encodedKey: loan.encodedKey
    }

    // create loan
    app
      .service('loan')
      .create(loanSchemData)
      .then(() => {
        logger.info('LOAN CREATED SUCCESSFULLY')
      })
      .catch((error) => {
        logger.error(error)
      })
  } catch (error) {
    const errorLog = JSON.stringify({
      level: 'error',
      data: { ...data },
      message: 'FAILED TO CREATE LOAN'
    })
    logger.log('error', errorLog)

    throw new GeneralError('FAILED TO FETCH LOAN:MAMBU')
  }
}
