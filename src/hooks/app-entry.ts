// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext, NextFunction } from '../declarations'
import util from '../utils'

export const appEntryHook = async (context: HookContext, next: NextFunction) => {
  console.log(`Running hook app-entry on ${context.path}.${context.method}`)
  const { method, data } = context
  const { createHash, createSessionFile } = util
  if (method === 'create') {
    console.log('===========')
    console.log(data.signed_request)
    console.log('===========')

    const mambuSignedRequest = data.signed_request
    if (!mambuSignedRequest) {
      throw new NotAuthenticated('Not authenticated')
    }
    const encodedString = mambuSignedRequest.split('.')[1]
    console.log('\n\n-----------------')
    console.log(createHash(encodedString))
    if (mambuSignedRequest.split('.')[0] === createHash(encodedString)) {
      console.log(createHash(encodedString))
      createSessionFile(mambuSignedRequest)
      // context.method = 'GET'
      await next()
    } else {
      throw new NotAuthenticated('Not authenticated')
    }
  } else {
    await next()
  }
  await next()
}
