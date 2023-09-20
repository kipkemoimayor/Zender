// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { LoanData } from '../../client'
import type { HookContext } from '../../declarations'
import { logger } from '../../logger'
import Mambu from '../../mambu'

export const createLoan = async (context: HookContext) => {
  console.log(`Running hook create-loan on ${context.path}.${context.method}`)
  const { data, result, app, additionalData } = context

  const loan = await new Mambu().getLoan(additionalData.loanId)

  // const fRepaymentDat: any = .toISOString()
  const loanSchemData: LoanData = {
    accountId: loan.id,
    clientId: result.id,
    firstRepaymentDate: new Date(loan.disbursementDetails.firstRepaymentDate),
    loanName: loan.loanName,
    mambuImei: additionalData.imei,
    status: loan.accountState
  }

  // create loan
  app
    .service('loan')
    .create(loanSchemData)
    .then((response) => {
      logger.info('LOAN CREATED SUCCESSFULLY')
    })
    .catch((error) => {
      logger.error(error)
    })
}
