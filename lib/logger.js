"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
exports.logger = (0, winston_1.createLogger)({
    // To see more detailed errors, change this to 'debug'
    level: 'info',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.json(), winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../logs/error.log'), level: 'error' }),
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../logs/info.log'), level: 'info' }),
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../logs/combined.log') })
    ]
});
//# sourceMappingURL=logger.js.map