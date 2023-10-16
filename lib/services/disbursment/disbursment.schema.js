"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disbursmentQueryResolver = exports.disbursmentQueryValidator = exports.disbursmentQuerySchema = exports.disbursmentQueryProperties = exports.disbursmentPatchResolver = exports.disbursmentPatchValidator = exports.disbursmentPatchSchema = exports.disbursmentDataResolver = exports.disbursmentDataValidator = exports.disbursmentDataSchema = exports.disbursmentExternalResolver = exports.disbursmentResolver = exports.disbursmentValidator = exports.disbursmentSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.disbursmentSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    imei: typebox_1.Type.String(),
    loanAccountId: typebox_1.Type.String()
}, { $id: 'Disbursment', additionalProperties: false });
exports.disbursmentValidator = (0, typebox_1.getValidator)(exports.disbursmentSchema, validators_1.dataValidator);
exports.disbursmentResolver = (0, schema_1.resolve)({});
exports.disbursmentExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.disbursmentDataSchema = typebox_1.Type.Pick(exports.disbursmentSchema, ['imei', 'loanAccountId'], {
    $id: 'DisbursmentData'
});
exports.disbursmentDataValidator = (0, typebox_1.getValidator)(exports.disbursmentDataSchema, validators_1.dataValidator);
exports.disbursmentDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.disbursmentPatchSchema = typebox_1.Type.Partial(exports.disbursmentSchema, {
    $id: 'DisbursmentPatch'
});
exports.disbursmentPatchValidator = (0, typebox_1.getValidator)(exports.disbursmentPatchSchema, validators_1.dataValidator);
exports.disbursmentPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.disbursmentQueryProperties = typebox_1.Type.Pick(exports.disbursmentSchema, ['id', 'loanAccountId']);
exports.disbursmentQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.disbursmentQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.disbursmentQueryValidator = (0, typebox_1.getValidator)(exports.disbursmentQuerySchema, validators_1.queryValidator);
exports.disbursmentQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=disbursment.schema.js.map