"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMS = void 0;
const sms_1 = require("../../sms/sms");
class SMS {
    constructor(app) {
        this.app = app;
    }
    getQueuedSms() {
        return this.app.service('sms-queue').find({
            query: {
                sent: false,
                direction: 'OUT'
            },
            paginate: false
        });
    }
    moveSentSms(sms) {
        const copy = { message: sms.message, sent: true, destination: sms.destination, direction: 'OUT' };
        this.app
            .service('sent-sms')
            .create({ ...copy, sent: true })
            .then(() => {
            // delete from qeueu
            this.app.service('sms-queue').remove(sms.id);
        });
    }
    deleteQueuedSms(id) {
        return this.app.service('sms-queue').remove(id);
    }
    sendSms(data) {
        return (0, sms_1.sendSMS)(data);
    }
}
exports.SMS = SMS;
//# sourceMappingURL=sms.js.map