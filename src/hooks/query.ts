// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'
import util from '../utils'

export const query = async (context: HookContext) => {
  console.log(`Running hook query on ${context.path}.${context.method}`)

  const { params } = context
  const { decodeString, readSession } = util

  const mambuUser = params.headers['mambuuser']

  let mambuSignedRequest = JSON.parse(readSession()).session
  if (!mambuSignedRequest) {
    mambuSignedRequest = mambuUser
  }

  const loanID = decodeString(mambuSignedRequest).OBJECT_ID
  context.params.query = {
    loan_id: loanID,
    $limit: 1,
    $sort: {
      id: -1
    }
  }
}
