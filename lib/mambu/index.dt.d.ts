export interface Imambu {
    getClient: (id: string) => Promise<any>;
    getLoan: (id: string) => Promise<any>;
    getLoanInstallment: (id: string) => Promise<any>;
}
