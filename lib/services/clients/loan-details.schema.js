"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanDetailsQueryResolver = exports.loanDetailsQueryValidator = exports.loanDetailsQuerySchema = exports.loanDetailsQueryProperties = exports.loanDetailsPatchResolver = exports.loanDetailsPatchValidator = exports.loanDetailsPatchSchema = exports.loanDetailsDataResolver = exports.loanDetailsDataValidator = exports.loanDetailsDataSchema = exports.loanDetailsExternalResolver = exports.loanDetailsResolver = exports.loanDetailsValidator = exports.loanDetailsSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.loanDetailsSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    fullName: typebox_1.Type.String(),
    idNumber: typebox_1.Type.String(),
    emailAddress: typebox_1.Type.String({ format: 'email' }),
    phoneNumber: typebox_1.Type.String(),
    location: typebox_1.Type.String(),
    status: typebox_1.Type.Number({ default: 1 }),
    createdAt: typebox_1.Type.String({ default: new Date() }),
    updatedAt: typebox_1.Type.String({ default: new Date() })
    // loanId: Type.Optional(Type.String()),
    // imei: Type.Optional(Type.String())
}, { $id: 'LoanDetails', additionalProperties: true });
exports.loanDetailsValidator = (0, typebox_1.getValidator)(exports.loanDetailsSchema, validators_1.dataValidator);
exports.loanDetailsResolver = (0, schema_1.resolve)({});
exports.loanDetailsExternalResolver = (0, schema_1.resolve)({});
// 'file_id', 'file_type', 'client_id', 'client_email'
// Schema for creating new entries
exports.loanDetailsDataSchema = typebox_1.Type.Pick(exports.loanDetailsSchema, ['fullName', 'idNumber', 'emailAddress', 'phoneNumber', 'location', 'status'], {
    $id: 'LoanDetailsData'
});
exports.loanDetailsDataValidator = (0, typebox_1.getValidator)(exports.loanDetailsDataSchema, validators_1.dataValidator);
exports.loanDetailsDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.loanDetailsPatchSchema = typebox_1.Type.Partial(exports.loanDetailsSchema, {
    $id: 'LoanDetailsPatch'
});
exports.loanDetailsPatchValidator = (0, typebox_1.getValidator)(exports.loanDetailsPatchSchema, validators_1.dataValidator);
exports.loanDetailsPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.loanDetailsQueryProperties = typebox_1.Type.Pick(exports.loanDetailsSchema, [
    'id',
    'status',
    'phoneNumber',
    'idNumber'
]);
exports.loanDetailsQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.loanDetailsQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.loanDetailsQueryValidator = (0, typebox_1.getValidator)(exports.loanDetailsQuerySchema, validators_1.queryValidator);
exports.loanDetailsQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=loan-details.schema.js.map