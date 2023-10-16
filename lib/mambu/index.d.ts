import { Imambu } from './index.dt';
export interface Installment {
    installments: any[];
}
export default class Mambu implements Imambu {
    private config;
    private axios;
    constructor();
    getClient(clientID: string): Promise<any>;
    getLoan(loanID: any): Promise<any>;
    searchLoans(encodedKeys: string[]): Promise<any[]>;
    getSchedule(loanAccountId: string): Promise<any[]>;
    getLoanInstallment(loanID: string): Promise<Installment>;
    getUser(userId: string): Promise<any>;
    getRole(roleId: string): Promise<any>;
    updateLoan(loanID: string, data: any): Promise<any>;
}
