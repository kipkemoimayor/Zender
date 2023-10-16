"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const utils_1 = __importDefault(require("../utils"));
const query = async (context) => {
    console.log(`Running hook query on ${context.path}.${context.method}`);
    const { params } = context;
    const { decodeString, readSession } = utils_1.default;
    const mambuUser = params.headers['mambuuser'];
    let mambuSignedRequest = JSON.parse(readSession()).session;
    if (!mambuSignedRequest) {
        mambuSignedRequest = mambuUser;
    }
    const loanID = decodeString(mambuSignedRequest).OBJECT_ID;
    context.params.query = {
        loan_id: loanID,
        $limit: 1,
        $sort: {
            id: -1
        }
    };
};
exports.query = query;
//# sourceMappingURL=query.js.map