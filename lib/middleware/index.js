"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
const utils_1 = __importDefault(require("../utils"));
const { createHash, createSessionFile } = utils_1.default;
const middleware = {
    validateEntry: function (req, res, next) {
        if (req.method === 'POST') {
            console.log(req.url);
            console.log('===========');
            console.log(req.body.signed_request);
            console.log('===========');
            const mambuSignedRequest = req.body.signed_request;
            if (!mambuSignedRequest) {
                throw new errors_1.NotAuthenticated('Not authenticated');
            }
            const encodedString = mambuSignedRequest.split('.')[1];
            console.log('\n\n-----------------');
            console.log(createHash(encodedString));
            if (mambuSignedRequest.split('.')[0] === createHash(encodedString)) {
                console.log(createHash(encodedString));
                createSessionFile(mambuSignedRequest);
                req.requestIsValid = true;
                req.method = 'GET';
                console.log('here:again');
                next();
            }
            else {
                throw new errors_1.NotAuthenticated('Not authenticated');
            }
        }
        else {
            next();
        }
    }
};
exports.default = middleware;
//# sourceMappingURL=index.js.map