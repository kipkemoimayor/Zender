"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statiscticsHook = void 0;
const statiscticsHook = async (context) => {
    console.log(`Running hook numbers on ${context.path}.${context.method}`);
    const { app } = context;
    if (context.getStats) {
        const buildQuery = context.service.createQuery();
        buildQuery.count('id as count');
        buildQuery.groupBy('make');
        //   buildQuery.whereRaw(`SELECT  count(id) as count,make  from nuovopay_test.device group by make`)
        const deviceStats = await app.service('device')._find({
            knex: buildQuery
        });
        context.result = deviceStats;
    }
};
exports.statiscticsHook = statiscticsHook;
//# sourceMappingURL=index.js.map