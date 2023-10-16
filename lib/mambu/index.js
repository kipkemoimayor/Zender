"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../utils/axios");
const logger_1 = require("../logger");
const errors_1 = require("@feathersjs/errors");
class Mambu {
    constructor() {
        this.config = {
            baseUrl: process.env.mambu_api_url,
            apiKey: process.env.mambu_api_key
        };
        this.axios = (0, axios_1.customAxios)(this.config);
    }
    async getClient(clientID) {
        try {
            const response = await this.axios.get(`/clients/${clientID}`, {
                params: {
                    detailsLevel: 'FULL'
                }
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.log('error', error);
            return null;
        }
    }
    async getLoan(loanID) {
        try {
            const response = await this.axios.get(`/loans/${loanID}`, {
                params: {
                    detailsLevel: 'FULL'
                }
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO FETCH LOAN ACCOUNT:MAMBU'
                });
                logger_1.logger.log('error', errorLog);
            }
            throw new errors_1.GeneralError(error);
        }
    }
    async searchLoans(encodedKeys) {
        try {
            const response = await this.axios.post(`/loans:search`, {
                filterCriteria: [
                    {
                        field: 'encodedKey',
                        operator: 'IN',
                        values: encodedKeys
                    }
                ]
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO SEARCH LOANS:MAMBU'
                });
                logger_1.logger.log('error', errorLog);
            }
            throw new errors_1.GeneralError(error);
        }
    }
    async getSchedule(loanAccountId) {
        try {
            const response = await this.axios.post(`/loans/${loanAccountId}/schedule`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO FETCH INSTALLMENT:MAMBU'
                });
                logger_1.logger.log('error', errorLog);
            }
            throw new errors_1.GeneralError(error);
        }
    }
    async getLoanInstallment(loanID) {
        try {
            const response = await this.axios.get(`/loans/${loanID}/schedule`, {
                params: {
                    limit: 1
                }
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO FETCH INSTALLMENT:MAMBU'
                });
                logger_1.logger.log('error', errorLog);
            }
            throw new errors_1.GeneralError(error);
        }
    }
    async getUser(userId) {
        try {
            const response = await this.axios.get(`/users/${userId}`, {
                params: {
                    detailsLevel: 'FULL'
                }
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.log('error', error.response);
            throw new errors_1.GeneralError(error);
        }
    }
    async getRole(roleId) {
        try {
            const response = await this.axios.get(`/userroles/${roleId}`, {
                params: {
                    detailsLevel: 'FULL'
                }
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.log('error', error.response);
            throw new errors_1.GeneralError(error);
        }
    }
    async updateLoan(loanID, data) {
        try {
            const response = await this.axios.patch(`/loans/${loanID}/custominformation`, data, {
                headers: {
                    Accept: 'application/vnd.mambu.v1+json'
                }
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.log('error', error.response);
            throw new errors_1.GeneralError(error);
        }
    }
}
exports.default = Mambu;
//# sourceMappingURL=index.js.map