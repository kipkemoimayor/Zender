"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisbursmentHook = void 0;
const mambu_1 = __importDefault(require("../../mambu"));
const utils_1 = __importDefault(require("../../utils"));
const dueReminder_1 = require("../payments/dueReminder");
const handleDisbursmentHook = async (context) => {
    console.log(`Running hook installemt-disbursment on ${context.path}.${context.method}`);
    const { data, app } = context;
    const duerClass = new dueReminder_1.DueReminder(app);
    const device = await app.service('device').find({
        query: {
            imei: data.imei
        }
    });
    if (device.data.length) {
        // get installments
        const clientInstallments = await new mambu_1.default().getLoanInstallment(data.loanAccountId);
        const installment = clientInstallments.installments[0];
        const deviceDetail = device.data[0];
        if (utils_1.default.formatDate(deviceDetail.nextLockDate, 'yyyy-MM-dd hh:mm:ss') !=
            utils_1.default.formatDate(new Date(installment.dueDate), 'yyyy-MM-dd hh:mm:ss')) {
            // adjust next lock date to new lock date
            duerClass.setLockDate(app, deviceDetail, {
                fullyPaid: false,
                installmentPaid: false,
                nextLockDate: installment.dueDate,
                number: installment.number
            });
        }
    }
};
exports.handleDisbursmentHook = handleDisbursmentHook;
//# sourceMappingURL=new-disbursment.js.map