"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../logger");
const mambu_1 = __importDefault(require("../../mambu"));
const reminder = {
    handleError(error) {
        logger_1.logger.error(error);
    },
    getActiveLoans(app) {
        return app.service('loan')._find({
            query: {
                status: 'ACTIVE',
                // mambuSynced: false,
                $or: [
                    {
                        mambuSyncedAt: {
                            $lte: new Date().toISOString()
                        }
                    },
                    {
                        mambuSyncedAt: null
                    }
                ]
            }
        });
    },
    getMambuLoan(loanIds) {
        const promise = loanIds.map((id) => {
            return new mambu_1.default().getLoanInstallment(id);
        });
        return Promise.all(promise);
    },
    filterPaidInstallments(installments, sort) {
        const filtered = installments.filter((installment) => installment.state === 'PAID' || installment.state == 'LATE');
        if (sort) {
            return filtered.sort((a, b) => {
                return Number(a.number) - Number(b.number);
            });
        }
        return filtered;
    },
    getExactDueDate(immediateInstallment) {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        const paid = immediateInstallment.state === 'PAID' || immediateInstallment.state === 'LATE';
        const daysInMil = new Date(immediateInstallment.dueDate).valueOf() - today.valueOf();
        const days = Math.round(daysInMil / (1000 * 60 * 60 * 24));
        console.log(daysInMil / (1000 * 60 * 60 * 24));
        return { days, paid };
    },
    getPendingInstallments(installments, sort) {
        const filtered = installments.filter((installment) => installment.state === 'PENDING' ||
            installment.state === 'LATE' ||
            installment.state == 'PARTIALY_PAID');
        if (sort) {
            return filtered.sort((a, b) => {
                return Number(a.number) - Number(b.number);
            });
        }
        return filtered;
    },
    getNumberOfDaysToDue(installments) {
        const today = new Date();
        const installment = reminder.getPendingInstallments(installments, true);
        if (!installment.length) {
            // means loan has been paid for fully
            return {
                paidOff: true,
                days: 0,
                paid: true,
                daysToNextInstallment: 0
            };
        }
        const pendingInstallment = installment[0];
        const instalmentdueDate = pendingInstallment.dueDate;
        const daysRemaining = new Date(instalmentdueDate).valueOf() - today.valueOf();
        const exactDueDate = reminder.getExactDueDate(pendingInstallment);
        return {
            paidOff: false,
            days: Math.round(daysRemaining / (1000 * 60 * 60 * 24)),
            paid: false,
            daysToNextInstallment: Math.round(daysRemaining / (1000 * 60 * 60 * 24))
        };
        // return
    },
    updateLoan(app, loan, data) {
        return app.service('loan')._patch(loan.id, data);
    }
};
exports.default = reminder;
//# sourceMappingURL=reminder.js.map