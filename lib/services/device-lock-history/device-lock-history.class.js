"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.DeviceLockHistoryService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class DeviceLockHistoryService extends knex_1.KnexService {
}
exports.DeviceLockHistoryService = DeviceLockHistoryService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'device_lock_history'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=device-lock-history.class.js.map