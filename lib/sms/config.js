"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios').default;
const sms = {};
/**
 * Send a post request to create/send SMS
 * @param {*} data
 * @returns asynchronous object
 */
sms.createSMS = function (data) {
    axios.defaults.baseURL = 'https://api.smsleopard.com/v1/';
    // axios.defaults.headers.common['Accept'] = 'application/json';
    if (!data) {
        throw Error('Post data must be provider');
    }
    return axios.post('/sms/send', data, {
        headers: {
            Authorization: `Basic ${process.env.SMS_AUTH}`
        }
    });
};
exports.default = sms;
//# sourceMappingURL=config.js.map