// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { GeneralError, NotAuthenticated } from '@feathersjs/errors'
import type { HookContext } from '../declarations'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../logger'
import Mambu from '../mambu'
import util from '../utils'
import { replaceDoc } from '../utils/replaceDoc'
import { replaceExcel, replaceHtml } from '../utils/replaceExcel'

export const handleLoan = async (context: HookContext) => {
  console.log(`Running hook handle-loan on ${context.path}.${context.method}`)
  let templateName = 'WorkingCapital.docx'

  const { params, data } = context
  const {
    amountOnRate,
    getCaveatFee,
    getWalletLimit,
    decodeString,
    readSession,
    formatCurrency,
    getInstallmentAmount,
    validateProduct,
    getTotalPrincipalBalance,
    getFee,
    getDisbursmentFee,
    fomartDate,
    planSchedule,
    generateRows
  } = util
  const { getLoan, getClient, getLoanInstallment, getUser, getRole } = new Mambu()

  const mambuUser = params.headers['mambuuser']

  let mambuSignedRequest = JSON.parse(readSession()).session
  if (!mambuSignedRequest) {
    mambuSignedRequest = mambuUser
  }

  const auth = decodeString(mambuSignedRequest).USER_KEY

  if (!auth) {
    throw new NotAuthenticated('You are not authorized to use this application')
  }

  const authUser = await getUser(auth)

  const allowedRoles = ['Head of Credit', 'Credit Supervisor']

  if (authUser.role) {
    const role = await getRole(authUser.role.encodedKey)
    if (!allowedRoles.includes(role.name)) {
      throw new NotAuthenticated('You are not authorized to use this application')
    }
  } else {
    throw new NotAuthenticated('You are not authorized to use this application')
  }

  const loanID = decodeString(mambuSignedRequest).OBJECT_ID

  const loan = await getLoan(loanID)

  let user: any = {
    firstName: '',
    lastName: ''
  }

  if (!loan) {
    logger.log('info', 'No loan found')
    throw new GeneralError('No loan found')
  }

  if (loan['_appriaser1'] && loan['_appriaser1']._APP_01) {
    user = await getUser(loan['_appriaser1'] && loan['_appriaser1']._APP_01)
  }

  if (!validateProduct(loan.loanName)) {
    logger.log('info', 'NO PRODUCT')
    throw new GeneralError('NO PRODUCT SELECTION')
  }

  // get client
  const client = await getClient(loan.accountHolderKey)

  if (!client) {
    logger.log('info', 'No client found')
    throw new GeneralError('No client found')
  }

  let appraisalFee = amountOnRate(loan.loanAmount, 4)
  let caveatFee = getCaveatFee(loan.loanAmount)

  // validate caveat fee

  if (loan['_top_up_loan'] && loan['_top_up_loan'].caveat_registeation_charges) {
    if (loan['_top_up_loan'].caveat_registeation_charges.toLowerCase() != 'yes') {
      caveatFee = 0
    }
  } else {
    caveatFee = 0
  }
  const walletLimit = getWalletLimit(loan.loanAmount, appraisalFee, caveatFee)

  /*
   sme capitalized
  */

  let installment = 0
  let principalBalance = 0
  let applicationFees = 0
  let insurancePremium = 0
  let mobileMoneyfee = 0
  let expectedAmount = 0
  let trackingFee = 0
  let proccessingFee = 0
  let pslAppraisalFee = 0
  let pslExpectedAmount = 0
  let installments = []
  let expectedInstallmentDate = ''
  let productState = 'Deducted'

  if (
    loan.loanName.toLowerCase().startsWith('sme secured') ||
    loan.loanName.toLowerCase().startsWith('commercial') ||
    loan.loanName.toLowerCase().startsWith('psl') ||
    loan.loanName.toLowerCase().startsWith('private') ||
    loan.loanName.toLowerCase().startsWith('insurance')
  ) {
    // get installment
    templateName = 'SMESecured.docx'
    const installmentData = await getLoanInstallment(loanID)
    installment = getInstallmentAmount(installmentData.installments)
    installments = installmentData.installments.map((x: any, index: number) => {
      return {
        no: index + 1,
        date: new Date(x.dueDate).toLocaleDateString(),
        amount:
          x.principal.amount.expected +
          x.interest.amount.expected +
          x.fee.amount.expected +
          x.penalty.amount.expected
      }
    })

    expectedInstallmentDate = installments[0] && installments[0].date
    // get total principal balance
    principalBalance = getTotalPrincipalBalance(installmentData.installments)

    const loanV1 = await getLoan(loanID, 'application/vnd.mambu.v1+json')

    applicationFees = getFee(loanV1.disbursementDetails.fees, 'Application Fees', loan.loanAmount)
    appraisalFee = getFee(loanV1.disbursementDetails.fees, 'Appraisal Fees', loan.loanAmount)
    if (!appraisalFee) {
      appraisalFee = getFee(loanV1.disbursementDetails.fees, 'Processing Fee', loan.loanAmount)
    }
    insurancePremium = getFee(loanV1.disbursementDetails.fees, 'Insurance Premium', loan.loanAmount)
    trackingFee = getFee(loanV1.disbursementDetails.fees, 'Tracking', loan.loanAmount)
    const modeOfDisbursment =
      loan['_Credit_Compliance_Loan_Accounts'] &&
      loan['_Credit_Compliance_Loan_Accounts'].Mode_Of_Disbursement

    mobileMoneyfee = getDisbursmentFee(modeOfDisbursment, client.mobilePhone)
    expectedAmount = getWalletLimit(
      loan.loanAmount,
      applicationFees,
      (loan['_top_up_loan'] && loan['_top_up_loan'].top_up_offer_letter) || 0,
      (loan['_buy_0ff_details'] && loan['_buy_0ff_details'].buy_off_amount) || 0,
      mobileMoneyfee,
      (loan['_disbursement_details'] && loan['_disbursement_details'].other_charges) || 0
    )

    proccessingFee = amountOnRate(loan.loanAmount, 10)
    pslAppraisalFee = amountOnRate(loan.loanAmount, 10)

    if (loan.loanName.toLowerCase().includes('capitalized')) {
      productState = 'Capitalized'
      pslExpectedAmount = getWalletLimit(
        loan.loanAmount,
        (loan['_top_up_loan'] && loan['_top_up_loan'].installment_interest) || 0,
        applicationFees,
        (loan['_top_up_loan'] && loan['_top_up_loan'].top_up_offer_letter) || 0,
        mobileMoneyfee
      )
    } else {
      pslExpectedAmount = getWalletLimit(
        loan.loanAmount,
        proccessingFee,
        applicationFees,
        (loan['_top_up_loan'] && loan['_top_up_loan'].installment_interest) || 0,
        (loan['_top_up_loan'] && loan['_top_up_loan'].top_up_offer_letter) || 0,
        mobileMoneyfee
      )
    }

    // private sector
    if (loan.loanName.toLowerCase().startsWith('private')) {
      caveatFee = getFee(loanV1.disbursementDetails.fees, 'Caveat', loan.loanAmount)

      expectedAmount = getWalletLimit(
        loan.loanAmount,
        (loan['_top_up_loan'] && loan['_top_up_loan'].top_up_offer_letter) || 0,
        (loan['_buy_0ff_details'] && loan['_buy_0ff_details'].buy_off_amount) || 0,
        (loan['_disbursement_details'] && loan['_disbursement_details'].other_charges) || 0
      )
    }
  }

  const replacements = {
    loanAmount: formatCurrency(loan.loanAmount),
    loanID: loan.id,
    clientName: `${client.firstName || ''} ${client.middleName || ''} ${client.lastName || ''}`.replace(
      /\s\s+/g,
      ' '
    ),
    homeAddress: (client['_pa1'] && client['_pa1'].ha1) || '',
    mobilePhone: client.mobilePhone || '',
    emailAddress: client.emailAddress || '',
    minimumRepayment: '',
    trackingFee: formatCurrency(trackingFee),
    appraisalFee: formatCurrency(appraisalFee),
    caveatFee: formatCurrency(caveatFee),
    walletLimit: formatCurrency(walletLimit),
    registrationNumber:
      (loan['_Vehicle__Insurance_Details_Loan'] && loan['_Vehicle__Insurance_Details_Loan'].reg_no) || '',
    date: fomartDate(new Date().toLocaleDateString()),
    //sme secured
    numberofInstalments: loan.scheduleSettings.repaymentInstallments,
    instalment: formatCurrency(installment),
    totalPrincipalbalance: formatCurrency(principalBalance),
    applicationFee: formatCurrency(applicationFees),
    insurancePremium: formatCurrency(insurancePremium),
    topUpAmount: formatCurrency((loan['_top_up_loan'] && loan['_top_up_loan'].top_up_offer_letter) || 0),
    buyoffAmount: formatCurrency((loan['_buy_0ff_details'] && loan['_buy_0ff_details'].buy_off_amount) || 0),
    mobileMoneyfee: formatCurrency(mobileMoneyfee),
    otherCharges: formatCurrency(
      (loan['_disbursement_details'] && loan['_disbursement_details'].other_charges) || 0
    ),
    expectedAmount: formatCurrency(expectedAmount),
    collateralType:
      (loan['_Security_Loan_Accounts'] && loan['_Security_Loan_Accounts'].collateral_type) || '',
    collateralDetails: (loan['_Security_Loan_Accounts'] && loan['_Security_Loan_Accounts'].CL01) || '',
    otherChargesNarration:
      (loan['_disbursement_details'] && loan['_disbursement_details'].other_narration_charges) || '',
    otherChargesOfferLetter:
      (loan['_disbursement_details'] && loan['_disbursement_details'].other_charges) || 0,
    proccessingFee: formatCurrency(proccessingFee),
    pslAppraisalFee: formatCurrency(pslAppraisalFee),
    instalmentInterest: formatCurrency(
      (loan['_top_up_loan'] && loan['_top_up_loan'].installment_interest) || 0
    ),
    pslExpectedAmount: formatCurrency(pslExpectedAmount),
    //ipf
    insuranceName:
      (loan['_Vehicle__Insurance_Details_Loan'] && loan['_Vehicle__Insurance_Details_Loan'].IC01) || '',
    installments: installments,
    startRepaymentDate:
      fomartDate(
        new Date(loan['_top_up_loan'] && loan['_top_up_loan'].IPF_start_date).toLocaleDateString()
      ) || fomartDate(new Date(expectedInstallmentDate).toLocaleDateString()),
    buyoffName: (loan['_buy_0ff_details'] && loan['_buy_0ff_details'].payee_name) || '',
    loanAppraiser: user.firstName
      ? `${user.firstName} ${user.lastName}`.replace(/\s\s+/g, ' ')
      : 'System Generated',
    productState: productState,
    rows: '',
    secRegNumber: (loan['_VID02'] && loan['_VID02'].reg_no02) || '',
    insuranceTwo: (loan['_VID02'] && loan['_VID02'].IC02) || '',
    secRegNumberMsg: '',
    insuranceTwoMsg: ''
  }

  if (replacements.secRegNumber) {
    replacements.secRegNumberMsg = `and ${replacements.secRegNumber}`
  }
  if (replacements.insuranceTwo) {
    replacements.insuranceTwoMsg = `and ${replacements.insuranceTwo}`
  }

  // const fileOutputId = uuidv4()
  const fileOutputId = `${replacements.clientName.split(' ').join('_')}_Offer_Letter_${loanID}`
  let fileType = 'docx'

  if (loan.loanName.toLowerCase().startsWith('commercial')) {
    templateName = 'SMECommercial.docx'
  }

  if (loan.loanName.toLowerCase().startsWith('private')) {
    templateName = 'PrivateSector.docx'
  }

  if (loan.loanName.toLowerCase().startsWith('psl')) {
    templateName = 'PSLOfferLetters.docx'
  }

  if (loan.loanName.toLowerCase().startsWith('insurance')) {
    console.log('here============')
    console.log(loan['_Vehicle__Insurance_Details_Loan'].IC01)
    console.log('here============')

    templateName = 'IPFOfferletterfinal.xlsx'
    const installments = planSchedule(
      replacements.startRepaymentDate,
      replacements.instalment,
      replacements.numberofInstalments
    )

    const rows = generateRows(installments)
    replacements.rows = rows
    fileType = 'xlsx'
  }

  if (fileType == 'docx') {
    replaceDoc(replacements, templateName, fileOutputId, fileType)
  } else {
    replaceExcel({ content: replaceHtml(replacements) }, fileOutputId)
  }

  const newData = {
    file_id: fileOutputId,
    file_type: 'pdf',
    client_id: client.id,
    client_email: client.emailAddress || null,
    loan_id: loanID,
    date_generated: new Date()
  }

  console.log(newData)

  Object.assign(data, newData)

  return context
}
