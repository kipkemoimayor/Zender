// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { NotAuthenticated } from '@feathersjs/errors'
import type { HookContext, NextFunction } from '../../declarations'

export const ipAuthHook = async (context: HookContext, next: NextFunction) => {
  console.log(`Running hook ip filter hook on ${context.path}.${context.method}`)
  const { params, app } = context

  console.log(context.params.provider)

  if (context.params.provider !== 'server') {
    const headers = params.headers

    console.log('=============')
    console.log(headers['x-forwarded-for'] && headers['x-forwarded-for'])
    console.log('=============')

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
          status: true,
          ipAddress: {
            $in: [userIp]
          },
          $limit: 0
        }
      })

      if (allowedIp.total === 0) {
        throw new NotAuthenticated('IP not allowed, Kindly request to be whitelisted')
      }

      await next()
    } catch (error: any) {
      throw new NotAuthenticated(error?.message)
    }
  }
}
