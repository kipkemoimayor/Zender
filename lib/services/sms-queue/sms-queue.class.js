"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.SmsQueueService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class SmsQueueService extends knex_1.KnexService {
}
exports.SmsQueueService = SmsQueueService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'sms_queue'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=sms-queue.class.js.map