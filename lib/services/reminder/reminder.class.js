"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.ReminderService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class ReminderService extends knex_1.KnexService {
}
exports.ReminderService = ReminderService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'reminder'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=reminder.class.js.map