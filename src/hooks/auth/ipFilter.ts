// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext } from '../../declarations'

export const ipAuthHook = async (context: HookContext) => {
  console.log(`Running hook ip filter hook on ${context.path}.${context.method}`)
  const { params, app } = context

  const headers = params.headers

  console.log(headers)

  if (!headers) {
    throw new NotAuthenticated('Invalid authentication')
  }

  try {
    const userIp = headers['x-forwarded-for'] && headers['x-forwarded-for']
    if (!userIp) {
      throw new NotAuthenticated('IP not allowed')
    }
    const allowedIp = await app.service('ip-list')._find({
      query: {
        ipAddress: {
          $in: [userIp]
        },
        $limit: 0
      }
    })

    if (allowedIp.total === 0) {
      throw new NotAuthenticated('IP not allowed, Kindly request to be whitelisted')
    }
  } catch (error) {
    throw new NotAuthenticated('Invalid authentication')
  }
}
