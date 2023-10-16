"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.LoanDetailsService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class LoanDetailsService extends knex_1.KnexService {
}
exports.LoanDetailsService = LoanDetailsService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'client'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=loan-details.class.js.map