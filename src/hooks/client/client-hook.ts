// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { GeneralError } from '@feathersjs/errors'
import type { HookContext } from '../../declarations'

export const clientHook = async (context: HookContext) => {
  console.log(`Running hook client-hook on ${context.path}.${context.method}`)
  const { data, app } = context

  // validate if client already exist
  const client = await app.service('client').find({
    query: {
      idNumber: data.idNumber
    }
  })

  if (client.total > 0) {
    throw new GeneralError('Client has already been registered')
  }

  console.log(data);
  

  //
  context.additionalData = {
    imei: data.imei,
    loanId: data.loanId
  }

  console.log(data)
}
