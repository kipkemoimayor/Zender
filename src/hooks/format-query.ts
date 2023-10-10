// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../declarations'

export const formatQuery = async (context: HookContext) => {
  const { query } = context.params
  
  const newQuery: any = {}

  for (let i in query) {
    if (!isNaN(query[i])) {
      newQuery[i] = Number(query[i])
    } else {
      newQuery[i] = query[i]
    }
  }

  context.params.query = {
    ...newQuery
  }

  console.log(context.params.query)
}
