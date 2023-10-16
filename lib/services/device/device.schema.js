"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceQueryResolver = exports.deviceQueryValidator = exports.deviceResultResolver = exports.deviceQuerySchema = exports.deviceQueryProperties = exports.devicePatchResolver = exports.devicePatchValidator = exports.devicePatchSchema = exports.deviceDataResolver = exports.deviceDataValidator = exports.deviceDataSchema = exports.deviceExternalResolver = exports.deviceResolver = exports.deviceValidator = exports.deviceSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const loan_schema_1 = require("../loan/loan.schema");
const loan_details_schema_1 = require("../clients/loan-details.schema");
// Main data model schema
exports.deviceSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    imei: typebox_1.Type.String(),
    status: typebox_1.Type.Any({ description: 'LOCKED-device locked,ACTIVE-device active', default: null }),
    loanId: typebox_1.Type.Integer(),
    loan: typebox_1.Type.Ref(loan_schema_1.loanSchema),
    createdAt: typebox_1.Type.String({ format: 'date-time' }),
    updatedAt: typebox_1.Type.String({ format: 'date-time' }),
    serialNo: typebox_1.Type.Optional(typebox_1.Type.Any()),
    make: typebox_1.Type.Optional(typebox_1.Type.Any()),
    model: typebox_1.Type.Optional(typebox_1.Type.Any()),
    locked: typebox_1.Type.Boolean(),
    mambuSynced: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    mambuSyncedAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    nuovoSynced: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    nuovoSyncedAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    clientId: typebox_1.Type.Integer(),
    client: typebox_1.Type.Ref(loan_details_schema_1.loanDetailsSchema),
    nuovoDeviceId: typebox_1.Type.Optional(typebox_1.Type.Any()),
    lockReady: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    lockReadyScheduleAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    lockDateSynced: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    nextLockDate: typebox_1.Type.Optional(typebox_1.Type.Any()),
    initialLockDate: typebox_1.Type.Optional(typebox_1.Type.Any()),
    lastConnectedAt: typebox_1.Type.Optional(typebox_1.Type.Any()),
    reminderSet: typebox_1.Type.Optional(typebox_1.Type.Boolean({ default: false })),
    reminderSetDate: typebox_1.Type.Optional(typebox_1.Type.Any()),
    scheduleNumber: typebox_1.Type.Optional(typebox_1.Type.Integer())
}, { $id: 'Device', additionalProperties: false });
exports.deviceValidator = (0, typebox_1.getValidator)(exports.deviceSchema, validators_1.dataValidator);
exports.deviceResolver = (0, schema_1.resolve)({});
exports.deviceExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.deviceDataSchema = typebox_1.Type.Pick(exports.deviceSchema, [
    'imei',
    'status',
    'loanId',
    'serialNo',
    'make',
    'model',
    'locked',
    'clientId',
    'nuovoDeviceId',
    'lockReady',
    'lockReadyScheduleAt',
    'lockDateSynced',
    'nextLockDate',
    'initialLockDate',
    'lastConnectedAt',
    'scheduleNumber'
], {
    $id: 'DeviceData'
});
exports.deviceDataValidator = (0, typebox_1.getValidator)(exports.deviceDataSchema, validators_1.dataValidator);
exports.deviceDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.devicePatchSchema = typebox_1.Type.Partial(exports.deviceSchema, {
    $id: 'DevicePatch'
});
exports.devicePatchValidator = (0, typebox_1.getValidator)(exports.devicePatchSchema, validators_1.dataValidator);
exports.devicePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.deviceQueryProperties = typebox_1.Type.Pick(exports.deviceSchema, [
    'id',
    'imei',
    'status',
    'mambuSynced',
    'mambuSynced',
    'loanId',
    'lockReady',
    'lockReadyScheduleAt',
    'locked',
    'nextLockDate',
    'reminderSet',
    'reminderSetDate',
    'clientId',
    'scheduleNumber'
]);
exports.deviceQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.deviceQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({
        $or: typebox_1.Type.Optional(typebox_1.Type.Any()),
        $limit: typebox_1.Type.Optional(typebox_1.Type.Any()),
        $select: typebox_1.Type.Optional(typebox_1.Type.Any()),
        getStats: typebox_1.Type.Optional(typebox_1.Type.Any()),
    }, { additionalProperties: false })
], { additionalProperties: false });
exports.deviceResultResolver = (0, schema_1.resolve)({
    loan: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('loan')._get(device.loanId);
    }),
    client: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('client')._get(device.clientId);
    })
});
exports.deviceQueryValidator = (0, typebox_1.getValidator)(exports.deviceQuerySchema, validators_1.queryValidator);
exports.deviceQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=device.schema.js.map