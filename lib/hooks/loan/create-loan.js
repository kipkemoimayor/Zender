"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoan = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
const errors_1 = require("@feathersjs/errors");
const logger_1 = require("../../logger");
const mambu_1 = __importDefault(require("../../mambu"));
const createLoan = async (context) => {
    console.log(`Running hook create-loan on ${context.path}.${context.method}`);
    const { data, result, app, additionalData } = context;
    try {
        const loan = await new mambu_1.default().getLoan(additionalData.loanId);
        // const fRepaymentDat: any = .toISOString()
        const loanSchemData = {
            accountId: loan.id,
            clientId: result.id,
            firstRepaymentDate: loan.disbursementDetails.firstRepaymentDate
                ? new Date(loan.disbursementDetails.firstRepaymentDate)
                : new Date(),
            loanName: loan.loanName,
            mambuImei: additionalData.imei,
            status: loan.accountState,
            encodedKey: loan.encodedKey
        };
        // create loan
        app
            .service('loan')
            .create(loanSchemData)
            .then(() => {
            logger_1.logger.info('LOAN CREATED SUCCESSFULLY');
        })
            .catch((error) => {
            logger_1.logger.error(error);
        });
    }
    catch (error) {
        const errorLog = JSON.stringify({
            level: 'error',
            data: { ...data },
            message: 'FAILED TO CREATE LOAN'
        });
        logger_1.logger.log('error', errorLog);
        throw new errors_1.GeneralError('FAILED TO FETCH LOAN:MAMBU');
    }
};
exports.createLoan = createLoan;
//# sourceMappingURL=create-loan.js.map