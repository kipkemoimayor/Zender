"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanQueryResolver = exports.loanQueryValidator = exports.loanResultResolver = exports.loanQuerySchema = exports.loanQueryProperties = exports.loanPatchResolver = exports.loanPatchValidator = exports.loanPatchSchema = exports.loanDataResolver = exports.loanDataValidator = exports.loanDataSchema = exports.loanExternalResolver = exports.loanResolver = exports.loanValidator = exports.loanSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const loan_details_schema_1 = require("../clients/loan-details.schema");
// Main data model schema
exports.loanSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    accountId: typebox_1.Type.String(),
    firstRepaymentDate: typebox_1.Type.Any(),
    loanName: typebox_1.Type.String(),
    status: typebox_1.Type.String(),
    mambuImei: typebox_1.Type.String(),
    clientId: typebox_1.Type.Integer(),
    client: typebox_1.Type.Ref(loan_details_schema_1.loanDetailsSchema),
    createdAt: typebox_1.Type.String({ default: new Date() }),
    updatedAt: typebox_1.Type.String({ default: new Date() }),
    retry: typebox_1.Type.Optional(typebox_1.Type.Integer({ default: 0 })),
    encodedKey: typebox_1.Type.String(),
    mambuSynced: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    mambuSyncedAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: 'date-time' })),
    daysRemaining: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    paid: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    paidOff: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    daysToNextInstallment: typebox_1.Type.Optional(typebox_1.Type.Integer())
}, { $id: 'Loan', additionalProperties: false });
exports.loanValidator = (0, typebox_1.getValidator)(exports.loanSchema, validators_1.dataValidator);
exports.loanResolver = (0, schema_1.resolve)({});
exports.loanExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.loanDataSchema = typebox_1.Type.Pick(exports.loanSchema, ['accountId', 'firstRepaymentDate', 'loanName', 'status', 'mambuImei', 'clientId', 'encodedKey'], {
    $id: 'LoanData'
});
exports.loanDataValidator = (0, typebox_1.getValidator)(exports.loanDataSchema, validators_1.dataValidator);
exports.loanDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.loanPatchSchema = typebox_1.Type.Partial(exports.loanSchema, {
    $id: 'LoanPatch'
});
exports.loanPatchValidator = (0, typebox_1.getValidator)(exports.loanPatchSchema, validators_1.dataValidator);
exports.loanPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.loanQueryProperties = typebox_1.Type.Pick(exports.loanSchema, [
    'id',
    'status',
    'retry',
    'daysRemaining',
    'mambuSynced',
    'mambuSyncedAt'
]);
exports.loanQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.loanQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.loanResultResolver = (0, schema_1.resolve)({
    client: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('client')._get(device.clientId);
    })
});
exports.loanQueryValidator = (0, typebox_1.getValidator)(exports.loanQuerySchema, validators_1.queryValidator);
exports.loanQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=loan.schema.js.map