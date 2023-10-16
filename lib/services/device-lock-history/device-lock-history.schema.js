"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceLockHistoryQueryResolver = exports.deviceLockHistoryQueryValidator = exports.lockHistoryResultResolver = exports.deviceLockHistoryQuerySchema = exports.deviceLockHistoryQueryProperties = exports.deviceLockHistoryPatchResolver = exports.deviceLockHistoryPatchValidator = exports.deviceLockHistoryPatchSchema = exports.deviceLockHistoryDataResolver = exports.deviceLockHistoryDataValidator = exports.deviceLockHistoryDataSchema = exports.deviceLockHistoryExternalResolver = exports.deviceLockHistoryResolver = exports.deviceLockHistoryValidator = exports.deviceLockHistorySchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const loan_schema_1 = require("../loan/loan.schema");
const device_schema_1 = require("../device/device.schema");
// Main data model schema
exports.deviceLockHistorySchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    type: typebox_1.Type.Number(),
    lockedAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    unlockedAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    createdAt: typebox_1.Type.Optional(typebox_1.Type.String({ default: new Date() })),
    updatedAt: typebox_1.Type.Optional(typebox_1.Type.String({ default: new Date() })),
    deviceId: typebox_1.Type.Integer(),
    loanId: typebox_1.Type.Integer(),
    reason: typebox_1.Type.String(),
    loan: typebox_1.Type.Ref(loan_schema_1.loanSchema),
    device: typebox_1.Type.Ref(device_schema_1.deviceSchema)
}, { $id: 'DeviceLockHistory', additionalProperties: false });
exports.deviceLockHistoryValidator = (0, typebox_1.getValidator)(exports.deviceLockHistorySchema, validators_1.dataValidator);
exports.deviceLockHistoryResolver = (0, schema_1.resolve)({});
exports.deviceLockHistoryExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.deviceLockHistoryDataSchema = typebox_1.Type.Pick(exports.deviceLockHistorySchema, ['type', 'lockedAt', 'unlockedAt', 'createdAt', 'updatedAt', 'deviceId', 'loanId', 'reason'], {
    $id: 'DeviceLockHistoryData'
});
exports.deviceLockHistoryDataValidator = (0, typebox_1.getValidator)(exports.deviceLockHistoryDataSchema, validators_1.dataValidator);
exports.deviceLockHistoryDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.deviceLockHistoryPatchSchema = typebox_1.Type.Partial(exports.deviceLockHistorySchema, {
    $id: 'DeviceLockHistoryPatch'
});
exports.deviceLockHistoryPatchValidator = (0, typebox_1.getValidator)(exports.deviceLockHistoryPatchSchema, validators_1.dataValidator);
exports.deviceLockHistoryPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.deviceLockHistoryQueryProperties = typebox_1.Type.Pick(exports.deviceLockHistorySchema, ['id', 'type']);
exports.deviceLockHistoryQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.deviceLockHistoryQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.lockHistoryResultResolver = (0, schema_1.resolve)({
    loan: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('loan')._get(device.loanId);
    }),
    device: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('device')._get(device.deviceId);
    })
});
exports.deviceLockHistoryQueryValidator = (0, typebox_1.getValidator)(exports.deviceLockHistoryQuerySchema, validators_1.queryValidator);
exports.deviceLockHistoryQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=device-lock-history.schema.js.map