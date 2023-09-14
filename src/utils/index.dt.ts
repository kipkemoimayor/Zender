export interface Iutil {
  amountOnRate: (amount: number, rate: number) => number
  getCaveatFee: (amount: number) => number
  getWalletLimit: (loanAmount: number, ...args: number[]) => number
  createHash: (string: string) => string
  splitMambuSignedRequest: (request: string) => string[]
  decodeString: (string: string) => any
  createSessionFile: (string: string) => void
  readSession: () => any
  formatCurrency: (amount: number) => string
  getInstallmentAmount: (instalments: any[]) => number
  validateProduct: (name: string) => boolean
  getTotalPrincipalBalance: (instalments: any[]) => number
  getFee: (fees: any[], feeName: string, loanAmount: number) => number
  getDisbursmentFee: (mode: string, phoneNumber: string) => number
  fomartDate: (date: string) => string
  generateRows: (installments: any[]) => string
  planSchedule: (date: string, amount: string, limit: number) => any[]
}
