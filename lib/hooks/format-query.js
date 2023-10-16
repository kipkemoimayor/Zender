"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatQuery = void 0;
const formatQuery = async (context) => {
    const { query } = context.params;
    const newQuery = {};
    for (let i in query) {
        if (!isNaN(query[i])) {
            newQuery[i] = Number(query[i]);
        }
        else {
            newQuery[i] = query[i];
        }
    }
    context.params.query = {
        ...newQuery
    };
};
exports.formatQuery = formatQuery;
//# sourceMappingURL=format-query.js.map