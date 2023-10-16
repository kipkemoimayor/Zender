"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsQueueQueryResolver = exports.smsQueueQueryValidator = exports.smsQueueQuerySchema = exports.smsQueueQueryProperties = exports.smsQueuePatchResolver = exports.smsQueuePatchValidator = exports.smsQueuePatchSchema = exports.smsQueueDataResolver = exports.smsQueueDataValidator = exports.smsQueueDataSchema = exports.smsQueueExternalResolver = exports.smsQueueResolver = exports.smsQueueValidator = exports.smsQueueSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.smsQueueSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    message: typebox_1.Type.String(),
    destination: typebox_1.Type.String(),
    direction: typebox_1.Type.String({ default: 'OUT' }),
    sent: typebox_1.Type.Boolean({ default: false }),
    createdAt: typebox_1.Type.String({ default: new Date() }),
    updatedAt: typebox_1.Type.String({ default: new Date() })
}, { $id: 'SmsQueue', additionalProperties: false });
exports.smsQueueValidator = (0, typebox_1.getValidator)(exports.smsQueueSchema, validators_1.dataValidator);
exports.smsQueueResolver = (0, schema_1.resolve)({});
exports.smsQueueExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.smsQueueDataSchema = typebox_1.Type.Pick(exports.smsQueueSchema, ['message', 'destination', 'direction', 'sent'], {
    $id: 'SmsQueueData'
});
exports.smsQueueDataValidator = (0, typebox_1.getValidator)(exports.smsQueueDataSchema, validators_1.dataValidator);
exports.smsQueueDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.smsQueuePatchSchema = typebox_1.Type.Partial(exports.smsQueueSchema, {
    $id: 'SmsQueuePatch'
});
exports.smsQueuePatchValidator = (0, typebox_1.getValidator)(exports.smsQueuePatchSchema, validators_1.dataValidator);
exports.smsQueuePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.smsQueueQueryProperties = typebox_1.Type.Pick(exports.smsQueueSchema, ['id', 'message', 'sent', 'direction']);
exports.smsQueueQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.smsQueueQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.smsQueueQueryValidator = (0, typebox_1.getValidator)(exports.smsQueueQuerySchema, validators_1.queryValidator);
exports.smsQueueQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=sms-queue.schema.js.map