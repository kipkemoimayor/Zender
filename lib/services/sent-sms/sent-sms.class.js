"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.SentSmsService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class SentSmsService extends knex_1.KnexService {
}
exports.SentSmsService = SentSmsService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'sent_sms'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=sent-sms.class.js.map