"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderQueryResolver = exports.reminderQueryValidator = exports.reminderResultResolver = exports.reminderQuerySchema = exports.reminderQueryProperties = exports.reminderPatchResolver = exports.reminderPatchValidator = exports.reminderPatchSchema = exports.reminderDataResolver = exports.reminderDataValidator = exports.reminderDataSchema = exports.reminderExternalResolver = exports.reminderResolver = exports.reminderValidator = exports.reminderSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const device_schema_1 = require("../device/device.schema");
const loan_schema_1 = require("../loan/loan.schema");
// Main data model schema
exports.reminderSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    type: typebox_1.Type.Integer(),
    sent: typebox_1.Type.Boolean({ default: false }),
    message: typebox_1.Type.String(),
    scheduledAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: 'date-time' })),
    device: typebox_1.Type.Ref(device_schema_1.deviceSchema),
    deviceId: typebox_1.Type.Integer(),
    loan: typebox_1.Type.Ref(loan_schema_1.loanSchema),
    loanId: typebox_1.Type.Integer(),
    createdAt: typebox_1.Type.String({ default: new Date() }),
    updatedAt: typebox_1.Type.String({ default: new Date() })
}, { $id: 'Reminder', additionalProperties: false });
exports.reminderValidator = (0, typebox_1.getValidator)(exports.reminderSchema, validators_1.dataValidator);
exports.reminderResolver = (0, schema_1.resolve)({});
exports.reminderExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.reminderDataSchema = typebox_1.Type.Pick(exports.reminderSchema, ['type', 'loanId', 'deviceId', 'message', 'sent'], {
    $id: 'ReminderData'
});
exports.reminderDataValidator = (0, typebox_1.getValidator)(exports.reminderDataSchema, validators_1.dataValidator);
exports.reminderDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.reminderPatchSchema = typebox_1.Type.Partial(exports.reminderSchema, {
    $id: 'ReminderPatch'
});
exports.reminderPatchValidator = (0, typebox_1.getValidator)(exports.reminderPatchSchema, validators_1.dataValidator);
exports.reminderPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.reminderQueryProperties = typebox_1.Type.Pick(exports.reminderSchema, [
    'id',
    'type',
    'sent',
    'loanId',
    'createdAt'
]);
exports.reminderQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.reminderQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.reminderResultResolver = (0, schema_1.resolve)({
    loan: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('loan')._get(device.loanId);
    }),
    device: (0, schema_1.virtual)(async (device, context) => {
        // Populate the user associated via `userId`
        return context.app.service('device')._get(device.deviceId);
    })
});
exports.reminderQueryValidator = (0, typebox_1.getValidator)(exports.reminderQuerySchema, validators_1.queryValidator);
exports.reminderQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=reminder.schema.js.map