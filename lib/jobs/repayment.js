"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentJob = void 0;
const reminder_1 = __importDefault(require("../hooks/payments/reminder"));
const schedule = require('node-schedule');
const paymentJob = (app) => {
    const job = schedule.scheduleJob('*/5 * * * *', async function () {
        console.log('payment scheduler running!');
        try {
            const loans = await reminder_1.default.getActiveLoans(app);
            const encodedKeys = loans.data.map((loan) => loan.encodedKey).filter((key) => key);
            if (!encodedKeys.length) {
                return;
            }
            const mambuLoans = await reminder_1.default.getMambuLoan(encodedKeys);
            const endDay = new Date();
            endDay.setMilliseconds(0);
            endDay.setMinutes(59);
            endDay.setHours(23);
            endDay.setSeconds(59);
            mambuLoans.forEach((installment) => {
                const dueDate = reminder_1.default.getNumberOfDaysToDue(installment.installments);
                const loan = loans.data.find((loan) => loan.encodedKey === installment.installments[0].parentAccountKey);
                if (loan) {
                    reminder_1.default.updateLoan(app, loan, {
                        mambuSyncedAt: endDay,
                        mambuSynced: true,
                        daysRemaining: dueDate.days,
                        paid: dueDate.paid,
                        daysToNextInstallment: dueDate.daysToNextInstallment,
                        paidOff: dueDate.paidOff
                    });
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.paymentJob = paymentJob;
//# sourceMappingURL=repayment.js.map