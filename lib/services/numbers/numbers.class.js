"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.NumbersService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class NumbersService extends knex_1.KnexService {
}
exports.NumbersService = NumbersService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mysqlClient'),
        name: 'numbers'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=numbers.class.js.map