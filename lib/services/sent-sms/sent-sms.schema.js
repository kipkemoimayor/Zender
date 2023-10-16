"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentSmsQueryResolver = exports.sentSmsQueryValidator = exports.sentSmsQuerySchema = exports.sentSmsQueryProperties = exports.sentSmsPatchResolver = exports.sentSmsPatchValidator = exports.sentSmsPatchSchema = exports.sentSmsDataResolver = exports.sentSmsDataValidator = exports.sentSmsDataSchema = exports.sentSmsExternalResolver = exports.sentSmsResolver = exports.sentSmsValidator = exports.sentSmsSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.sentSmsSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    message: typebox_1.Type.String(),
    destination: typebox_1.Type.String(),
    direction: typebox_1.Type.String({ default: 'OUT' }),
    sent: typebox_1.Type.Boolean({ default: false }),
    createdAt: typebox_1.Type.String({ default: new Date() }),
    updatedAt: typebox_1.Type.String({ default: new Date() })
}, { $id: 'SentSms', additionalProperties: false });
exports.sentSmsValidator = (0, typebox_1.getValidator)(exports.sentSmsSchema, validators_1.dataValidator);
exports.sentSmsResolver = (0, schema_1.resolve)({});
exports.sentSmsExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.sentSmsDataSchema = typebox_1.Type.Pick(exports.sentSmsSchema, ['message', 'destination', 'direction', 'sent'], {
    $id: 'SentSmsData'
});
exports.sentSmsDataValidator = (0, typebox_1.getValidator)(exports.sentSmsDataSchema, validators_1.dataValidator);
exports.sentSmsDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.sentSmsPatchSchema = typebox_1.Type.Partial(exports.sentSmsSchema, {
    $id: 'SentSmsPatch'
});
exports.sentSmsPatchValidator = (0, typebox_1.getValidator)(exports.sentSmsPatchSchema, validators_1.dataValidator);
exports.sentSmsPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.sentSmsQueryProperties = typebox_1.Type.Pick(exports.sentSmsSchema, ['id', 'destination']);
exports.sentSmsQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.sentSmsQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.sentSmsQueryValidator = (0, typebox_1.getValidator)(exports.sentSmsQuerySchema, validators_1.queryValidator);
exports.sentSmsQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=sent-sms.schema.js.map