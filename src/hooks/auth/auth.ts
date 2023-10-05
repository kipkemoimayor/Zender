// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext } from '../../declarations'

export const AuthHook = async (context: HookContext) => {
  console.log(`Running hook client-hook on ${context.path}.${context.method}`)
  const { params } = context

  const auth = params.headers.authorization

  if (!auth) {
    throw new NotAuthenticated('Invalid authentication')
  }

  try {
    const authDetails = auth.split(' ')[1]

    let plain = Buffer.from(authDetails, 'base64').toString('utf8')

    const password = plain.split(':')[1]
    const username = plain.split(':')[0]

    if (username !== 'admin' || password !== 'Admin@!') {
      throw new NotAuthenticated('Invalid authentication')
    }
  } catch (error) {
    throw new NotAuthenticated('Invalid authentication')
  }
}
