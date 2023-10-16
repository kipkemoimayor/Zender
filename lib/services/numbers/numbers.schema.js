"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numbersQueryResolver = exports.numbersQueryValidator = exports.numbersQuerySchema = exports.numbersQueryProperties = exports.numbersPatchResolver = exports.numbersPatchValidator = exports.numbersPatchSchema = exports.numbersDataResolver = exports.numbersDataValidator = exports.numbersDataSchema = exports.numbersExternalResolver = exports.numbersResolver = exports.numbersValidator = exports.numbersSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.numbersSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Numbers', additionalProperties: false });
exports.numbersValidator = (0, typebox_1.getValidator)(exports.numbersSchema, validators_1.dataValidator);
exports.numbersResolver = (0, schema_1.resolve)({});
exports.numbersExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.numbersDataSchema = typebox_1.Type.Pick(exports.numbersSchema, ['text'], {
    $id: 'NumbersData'
});
exports.numbersDataValidator = (0, typebox_1.getValidator)(exports.numbersDataSchema, validators_1.dataValidator);
exports.numbersDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.numbersPatchSchema = typebox_1.Type.Partial(exports.numbersSchema, {
    $id: 'NumbersPatch'
});
exports.numbersPatchValidator = (0, typebox_1.getValidator)(exports.numbersPatchSchema, validators_1.dataValidator);
exports.numbersPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.numbersQueryProperties = typebox_1.Type.Pick(exports.numbersSchema, ['id', 'text']);
exports.numbersQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.numbersQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.numbersQueryValidator = (0, typebox_1.getValidator)(exports.numbersQuerySchema, validators_1.queryValidator);
exports.numbersQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=numbers.schema.js.map