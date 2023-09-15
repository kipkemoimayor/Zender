const { createHmac } = require('crypto')
const fs = require('fs')
import path from 'path'

import { Iutil } from './index.dt'
import { addMonth } from './date'

const util: Iutil = {
  /**
   *
   * @param amount loan amount
   * @param rate rate in percentage
   * @returns the amount after rate percentage
   */
  amountOnRate: function (amount: number, rate: number) {
    return (rate / 100) * amount
  },

  /**
   * 1%*Loan Amount+(191250)
   * @param amount loan amount
   * @returns a double amount
   */
  getCaveatFee(amount) {
    return (1 / 100) * amount + 191250
  },

  /**
   *
   * @param loanAmount original loan amount
   * @param fees array of fees
   * @returns loan amount deducted by appraisal fee and caveat
   */
  getWalletLimit(loanAmount, ...fees) {
    const total = fees.reduce((p, c) => p + Number(c), 0)
    return loanAmount - total
  },
  /**
   *
   * @param string signed request
   * @returns an encode base64 string
   */
  createHash: function (string: string) {
    if (!process.env.app_key) {
      return false
    }
    return createHmac('sha256', process.env.app_key).update(string).digest('hex')
  },

  /**
   * splits mambu signed request
   * @param request signed mambu request
   * @returns an array of string
   */
  splitMambuSignedRequest: function (request: string) {
    if (!request) {
      return []
    }
    return request.split('.')
  },
  /**
   * Decodes mambu signed request
   * @param string base64 string
   * @returns an object with readable data
   */
  decodeString: function (string: string) {
    if (!string) {
      return {}
    }
    const request = util.splitMambuSignedRequest(string)
    if (request.length < 2) {
      return {}
    }
    return JSON.parse(Buffer.from(request[1], 'base64').toString('utf8'))
  },

  /**
   * Saves users session to file
   * @param data string containing logged in user
   */
  createSessionFile: function (data) {
    const file = `
    function saveSession (val){
      localStorage.setItem('mambuUser', val);
    }
    saveSession("${data}")`
    try {
      const user = { session: data }
      fs.writeFileSync(path.join(__dirname, '../../public/views/assets/session.js'), file)
      fs.writeFileSync(
        path.join(__dirname, `../../public/resources/userSession.json`),
        JSON.stringify(user),
        'utf-8'
      )
    } catch (error) {
      console.log(error)
    }
  },
  readSession: function () {
    const file = fs.readFileSync(path.join(__dirname, `../../public/resources/userSession.json`), {
      encoding: 'utf-8'
    })
    return file
  },
  /**
   * Format amount into readable digits
   * @param amount
   * @returns a string of number comma separated
   */
  formatCurrency: (amount) => {
    return new Intl.NumberFormat().format(amount)
  },
  /**
   *
   * @param installments an array of loan instalments
   * @returns total expected installment
   */
  getInstallmentAmount: (installments: any[]) => {
    const installment = installments[0]
    return (
      installment.principal.amount.expected +
      installment.interest.amount.expected +
      installment.fee.amount.expected +
      installment.penalty.amount.expected
    )
  },
  getTotalPrincipalBalance: (installments: any[]) => {
    return installments.reduce((prev, curr) => {
      prev += curr.principal.amount.expected
      return prev
    }, 0)
  },
  /**
   * Checks if loan product is within selected
   * @param name loan name
   * @returns boolean true or false
   */
  validateProduct(name) {
    let working = name.toLowerCase().startsWith('working')
    let sme = name.toLowerCase().startsWith('sme secured') || name.toLowerCase().startsWith('commercial')
    const ipf = name.toLowerCase().startsWith('insurance')
    const priv = name.toLowerCase().startsWith('psl')
    const privateSector = name.toLowerCase().startsWith('private')
    return working || sme || ipf || priv || privateSector
  },
  getFee(fees, feeName, loanAmount) {
    if (!fees.length) {
      return 0
    }
    const fee = fees.find((fee) => fee.fee.name.includes(feeName))

    if (fee) {
      if (fee.fee.amount) {
        return fee.fee.amount
      } else {
        if (fee.fee.percentageAmount) {
          return util.amountOnRate(loanAmount, fee.fee.percentageAmount)
        } else {
          return fee.amount
        }
      }
    } else {
      return 0
    }
  },
  getDisbursmentFee: function (mode: string, mobilePhone: string) {
    if (mode == 'MOBILE MONEY') {
      if (
        mobilePhone.startsWith('25677') ||
        mobilePhone.startsWith('25678') ||
        mobilePhone.startsWith('25676') ||
        mobilePhone.startsWith('25639')
      ) {
        return 1200
      } else {
        return 1000
      }
    } else {
      return 10000
    }
  },
  fomartDate(date: string) {
    const newDate = date.split('/')
    return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
  },
  /**
   * Create table rows
   * @param installments an array of formarted installments
   * @returns rows generated for all installments
   */
  generateRows(installments: any[]) {
    let row = ''

    for (let i of installments) {
      row += `
        <tr>
          <td>${i.index}</td>
          <td>${i.date}</td>
          <td style="text-align: right;">${i.amount}</td>
        </tr>
      `
    }
    return row
  },
  planSchedule(startDate: string, amount: string, cycle: number) {
    const installments: any[] = []

    for (let i = 0; i < cycle; i++) {
      const date = addMonth(startDate, i)
      const installment = {
        index: i + 1,
        date,
        amount
      }

      installments.push(installment)
    }
    return installments
  }
}

export default util
