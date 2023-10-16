"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockDeviceQueryResolver = exports.lockDeviceQueryValidator = exports.lockDeviceQuerySchema = exports.lockDeviceQueryProperties = exports.lockDevicePatchResolver = exports.lockDevicePatchValidator = exports.lockDevicePatchSchema = exports.lockDeviceDataResolver = exports.lockDeviceDataValidator = exports.lockDeviceDataSchema = exports.lockDeviceExternalResolver = exports.lockDeviceResolver = exports.lockDeviceValidator = exports.lockDeviceSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.lockDeviceSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    type: typebox_1.Type.String(),
    loanAccountId: typebox_1.Type.String(),
    imei: typebox_1.Type.String()
}, { $id: 'LockDevice', additionalProperties: false });
exports.lockDeviceValidator = (0, typebox_1.getValidator)(exports.lockDeviceSchema, validators_1.dataValidator);
exports.lockDeviceResolver = (0, schema_1.resolve)({});
exports.lockDeviceExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.lockDeviceDataSchema = typebox_1.Type.Pick(exports.lockDeviceSchema, ['type', 'loanAccountId', 'imei'], {
    $id: 'LockDeviceData'
});
exports.lockDeviceDataValidator = (0, typebox_1.getValidator)(exports.lockDeviceDataSchema, validators_1.dataValidator);
exports.lockDeviceDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.lockDevicePatchSchema = typebox_1.Type.Partial(exports.lockDeviceSchema, {
    $id: 'LockDevicePatch'
});
exports.lockDevicePatchValidator = (0, typebox_1.getValidator)(exports.lockDevicePatchSchema, validators_1.dataValidator);
exports.lockDevicePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.lockDeviceQueryProperties = typebox_1.Type.Pick(exports.lockDeviceSchema, ['id', 'type']);
exports.lockDeviceQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.lockDeviceQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.lockDeviceQueryValidator = (0, typebox_1.getValidator)(exports.lockDeviceQuerySchema, validators_1.queryValidator);
exports.lockDeviceQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=lock-device.schema.js.map