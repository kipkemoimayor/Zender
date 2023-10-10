export interface Iutil {
  amountOnRate: (amount: number, rate: number) => number
  getCaveatFee: (amount: number) => number
  getWalletLimit: (loanAmount: number, ...args: number[]) => number
  createHash: (string: string) => any
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
  encrypt: (string: string, user: string) => any
  decrypt: (data: any, user: string) => any
  generateKeyPair: () => any
  writeToFile: (filename: string, data: string, user: string) => void
  readFromFile: (filename: string, user: string) => string
  sleep: (ms: number) => Promise<any>
  formatDate: (date: Date, format: string) => string
}
