"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueReminder = void 0;
const logger_1 = require("../../logger");
const mambu_1 = __importDefault(require("../../mambu"));
const api_1 = require("../../nuovo/api");
const utils_1 = __importDefault(require("../../utils"));
const lock_1 = require("./lock");
const reminder_1 = __importDefault(require("./reminder"));
class DueReminder {
    constructor(app) {
        this.app = app;
    }
    getDeviceDueInOneDay() {
        const dateFrom = new Date();
        dateFrom.setHours(0);
        dateFrom.setMinutes(0);
        dateFrom.setSeconds(0);
        dateFrom.setMilliseconds(0);
        const from = utils_1.default.formatDate(dateFrom, 'yyyy-MM-dd hh:mm:ss');
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(0);
        const dateTo = utils_1.default.formatDate(endDate, 'yyyy-MM-dd hh:mm:ss');
        return this.app.service('device').find({
            query: {
                $and: [
                    {
                        nextLockDate: {
                            $gt: from
                        }
                    },
                    {
                        nextLockDate: {
                            $lt: dateTo
                        }
                    }
                ],
                status: 'ACTIVE'
            },
            paginate: false
        });
    }
    getLoansDueInOneDay(loans) {
        return this.app.service('loan').find({
            query: {
                $or: [
                    {
                        daysRemaining: {
                            $lte: 1
                        }
                    },
                    { daysRemaining: null }
                ],
                status: 'ACTIVE',
                id: {
                    $nin: loans
                }
            }
        });
    }
    createSms(data) {
        return this.app.service('sms-queue').create(data);
    }
    getLoans(loans) {
        return this.app.service('loan').find({
            query: {
                id: {
                    $nin: loans
                }
            }
        });
    }
    getReminders(query) {
        process.env.TZ = 'Africa/Nairobi';
        const startDate = new Date();
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        const nDate = startDate.toLocaleString('en-US', {
            timeZone: 'Africa/Nairobi'
        });
        console.log(nDate);
        const endDay = new Date();
        endDay.setHours(23);
        endDay.setMinutes(59);
        endDay.setSeconds(59);
        console.log(startDate);
        console.log(endDay);
        const dDate = endDay.toLocaleString('en-US', {
            timeZone: 'Africa/Nairobi'
        });
        console.log(startDate.toISOString());
        return this.app.service('reminder')._find({
            query: {
                // sent: true,
                ...query,
                $and: [{ createdAt: { $gt: startDate.toISOString() } }, { createdAt: { $lt: endDay.toISOString() } }]
            }
        });
    }
    async setReminders(app, device) {
        const days = Math.floor(new Date(device.nextLockDate).valueOf() / (1000 * 60 * 60 * 24));
        const mgs = days == 0 ? 'today' : 'tomorrow';
        const message = `Hello ${device.client.fullName}, Your Easy Phone Loan is due ${mgs}. Please make payment to avoid your phone being locked. Dial *619*11# . Easy Phone powered by Platinum Credit.`;
        const scheduleTo = new Date();
        scheduleTo.setDate(scheduleTo.getDate() + 7);
        // set nuovo reminders
        new api_1.NuovoApi()
            .setReminder({
            message: message,
            deviceIds: [device.nuovoDeviceId]
        })
            .then(() => {
            app
                .service('reminder')
                ._create({
                type: days == 1 ? 1 : 2,
                deviceId: device.id,
                loanId: device.loan.id,
                message: message,
                sent: true
            })
                .catch((error) => {
                logger_1.logger.error(JSON.stringify({
                    level: 'error',
                    message: 'FAILED TO CREATE REMINDER:LOCAL',
                    data: error
                }));
            });
            // CREATE SMS
            this.createSms({
                message: message,
                destination: device.client.phoneNumber,
                direction: 'OUT',
                sent: false
            }).catch((error) => {
                logger_1.logger.error(JSON.stringify({
                    level: 'error',
                    message: 'FAILED TO CREATE SMS:LOCAL',
                    data: error
                }));
            });
            // UPDATE DEVICE
            app
                .service('device')
                ._patch(device.id, {
                reminderSet: true,
                reminderSetDate: new Date()
            })
                .catch((error) => {
                logger_1.logger.error(JSON.stringify({
                    level: 'error',
                    message: 'FAILED TO UPDATED DEVICE REMINDER SET DATES:LOCAL',
                    data: error
                }));
            });
        })
            .catch((error) => {
            console.log(error.response);
        });
    }
    mapData(data, mapKey) {
        return data.map((x) => x[mapKey]);
    }
    async loanPaid(loanId) {
        const installments = await new mambu_1.default().getLoanInstallment(loanId);
        return reminder_1.default.getNumberOfDaysToDue(installments.installments);
    }
    async installmentPaid(loanId, device) {
        const mambuInstallments = await new mambu_1.default().getLoanInstallment(loanId);
        // (
        //   util.formatDate(device.nextLockDate, 'yyyy-MM-dd hh:mm:ss') ===
        //   util.formatDate(new Date(installment.dueDate), 'yyyy-MM-dd hh:mm:ss')
        // )
        const installments = mambuInstallments.installments.filter((installment) => {
            return installment.number == device.scheduleNumber;
        });
        const installment = installments[0];
        if (installment && installment.state === 'PAID') {
            // get next installmet
            const nextInstallment = mambuInstallments.installments.filter((inst) => Number(inst.number) > Number(installment.number));
            if (nextInstallment.length) {
                return {
                    nextLockDate: nextInstallment[0].dueDate,
                    installmentPaid: true,
                    fullyPaid: false,
                    number: +nextInstallment[0].number
                };
            }
            else {
                return {
                    nextLockDate: null,
                    installmentPaid: true,
                    fullyPaid: true,
                    number: 0
                };
            }
        }
        return {
            nextLockDate: null,
            installmentPaid: false,
            fullyPaid: false,
            number: null
        };
    }
    setLockDate(app, device, data, locked = false) {
        new api_1.NuovoApi()
            .scheduleDeviceLock([device.nuovoDeviceId], data.nextLockDate)
            .then(() => {
            // update local device
            logger_1.logger.info('UPDATED NUOVO LOCK DATES SUCCESSFULLY');
            app
                .service('device')
                ._patch(device.id, {
                lockDateSynced: true,
                initialLockDate: new Date(data.nextLockDate),
                nextLockDate: new Date(data.nextLockDate),
                locked: locked,
                scheduleNumber: data.number,
                lockReadyScheduleAt: new Date(data.nextLockDate)
            })
                .catch((error) => {
                logger_1.logger.error(JSON.stringify({
                    level: 'error',
                    message: 'FAILED TO UPDATED DEVICE LOCK DATES:LOCAL',
                    data: error
                }));
            });
        })
            .catch((error) => {
            logger_1.logger.error(JSON.stringify({
                level: 'error',
                message: 'FAILED TO UPDATED DEVICE LOCK DATES:NUOVO',
                data: error
            }));
        });
    }
    async handlePaymentAdjustment(device) {
        const mambuInstallments = await new mambu_1.default().getLoanInstallment(device.loan.accountId);
        const installments = mambuInstallments.installments.filter((installment) => {
            return installment.number == device.scheduleNumber;
        });
        const installment = installments[0];
        const prevInstallment = mambuInstallments.installments.filter((inst) => Number(inst.number) < Number(installment.number));
        // lock device
        if (prevInstallment.length) {
            this.setLockDate(this.app, device, {
                nextLockDate: prevInstallment[0].dueDate,
                number: prevInstallment[0].number,
                fullyPaid: false,
                installmentPaid: false
            }, new Date().getTime() > new Date(prevInstallment[0].dueDate).getTime());
            // update device initial lock date
            await new api_1.NuovoApi().updateCustomer(device.nuovoDeviceId, {
                device: {
                    first_lock_date: prevInstallment[0].dueDate
                }
            });
            await utils_1.default.sleep(5000);
            if (new Date().getTime() > new Date(prevInstallment[0].dueDate).getTime()) {
                new lock_1.LockDevice(this.app)
                    .lockDevice([device.nuovoDeviceId])
                    .then(() => {
                    console.log('DEVICE LOCKED SUCCESSFULLY:ADJUSTMENT');
                    // record history
                    this.app.service('device-lock-history').create({
                        deviceId: device.id,
                        reason: 'PAYMENT ADJUSTED',
                        loanId: device.loan.id,
                        type: 1,
                        lockedAt: new Date()
                    });
                })
                    .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
}
exports.DueReminder = DueReminder;
//# sourceMappingURL=dueReminder.js.map