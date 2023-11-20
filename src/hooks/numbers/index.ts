// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../declarations'

export const statiscticsHook = async (context: HookContext) => {
  console.log(`Running hook numbers on ${context.path}.${context.method}`)
  const { app } = context

  if (context.getStats) {
    const buildQuery = context.service.createQuery()
    buildQuery.count('id as count')
    buildQuery.groupBy('make')

    //   buildQuery.whereRaw(`SELECT  count(id) as count,make  from nuovopay_test.device group by make`)

    const deviceStats = await app.service('device')._find({
      knex: buildQuery
    })

    context.result = deviceStats
  } else if (context.getSalesPerMonth) {
    const buildQuery = context.service.createQuery()
    buildQuery.select('createdAt')
    buildQuery.count('id as count')
    buildQuery.groupByRaw('MONTH(createdAt)')

    const deviceStats = await app.service('device')._find({
      knex: buildQuery
    })

    context.result = deviceStats
  }
}
