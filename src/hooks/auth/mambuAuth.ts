// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext } from '../../declarations'
import util from '../../utils'

export const roles: any = {
  admin: {
    canViewClients: true,
    canViewDevices: true,
    canViewLockHistory: true,
    canViewReminders: true
  },
  adminOne: {
    canViewClients: true,
    canViewDevices: true
  },
  adminTwo: {
    canViewClients: true,
    canViewDevices: true
  }
}

export const mambuAuth = async (context: HookContext) => {
  console.log(`Running hook query on ${context.path}.${context.method}`)

  const { params, app } = context
  const users: any = app.get('users')

  const { decodeString } = util

  const mambuUser = params.headers['mambuuser']

  const userId = decodeString(mambuUser).USER_KEY

  const userRole = users[userId]

  console.log('----------------')

  console.log(context.ROLEACTION)

  console.log('----------------')

  const canViewClients = roles[userRole] && roles[userRole][context.ROLEACTION]

  if (!canViewClients) {
    throw new NotAuthenticated()
  }
}
