// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../declarations'
import { logger } from '../../logger'
import { constants } from '../../contants'
import util from '../../utils'

export const addSMSFiler = async (context: HookContext) => {
  console.log(`Running hook sms-hook client filter on ${context.path}.${context.method}`)
  const { params, app } = context
  const { decodeString } = util

  let clientLoanId: any = 0
  if (params.headers) {
    console.log('hrerrrrrrrrrrrrrrrrrrrrrrrrrrrrr')

    const mambuUser = params.headers['mambuuser']

    const loanId = decodeString(mambuUser).OBJECT_ID

    if (loanId) {
      clientLoanId = loanId
    }
  }

  console.log(clientLoanId)

  const localClient = await app.service('client')._find({
    query: {
      loanId: clientLoanId
    }
  })

  const phoneNumber = (localClient.data[0] && localClient.data[0].guarantorPhoneNumber) || ''

  console.log(phoneNumber)

  params.query = { ...params.query, destination: phoneNumber }
}
