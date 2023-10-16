"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuovoApi = void 0;
const logger_1 = require("../logger");
const axios_1 = require("../utils/axios");
const errors_1 = require("@feathersjs/errors");
class NuovoApi {
    constructor() {
        this.config = {
            baseUrl: process.env.NUOVO_PAY_BASE_URL,
            apiKey: process.env.NUOVO_PAY_API_KEY
        };
        this.axios = (0, axios_1.customAxios)(this.config);
    }
    async getAllDevices(query) {
        try {
            const response = await this.axios.get(`/devices.json`, {
                params: {
                    search_string: query
                }
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                logger_1.logger.log('error', error.response);
            }
            //   logger.log('error', error)
            return error;
        }
    }
    async getDevice(deviceId) {
        try {
            const response = await this.axios.get(`/devices/${deviceId}.json`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                logger_1.logger.log('error', error.response);
            }
            //   logger.log('error', error)
            return error;
        }
    }
    async updateCustomer(deviceId, data) {
        try {
            const response = await this.axios.patch(`/devices/${deviceId}.json`, data);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO UPDATE NUOVO DEVICE'
                });
                logger_1.logger.log('error', errorLog);
            }
            //   logger.log('error', error)
            throw new errors_1.GeneralError(error);
        }
    }
    async lockDevice(deviceIds) {
        try {
            const response = await this.axios.patch(`/devices/lock.json`, {
                device_ids: deviceIds
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO UPDATE NUOVO DEVICE'
                });
                logger_1.logger.log('error', errorLog);
            }
            //   logger.log('error', error)
            throw new errors_1.GeneralError(error);
        }
    }
    async unlockDevice(deviceIds) {
        try {
            const response = await this.axios.patch(`/devices/unlock.json`, {
                device_ids: deviceIds
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO UPDATE NUOVO DEVICE'
                });
                logger_1.logger.log('error', errorLog);
            }
            //   logger.log('error', error)
            throw new errors_1.GeneralError(error);
        }
    }
    async scheduleDeviceLock(deviceId, lockDate) {
        try {
            const response = await this.axios.patch(`/devices/unlock.json`, {
                device_ids: deviceId,
                auto_lock_date: lockDate
            }, {
                baseURL: process.env.NUOVO_PAY_BASE_URL_V2
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO SET AUTO-LOCK DATE NUOVO DEVICE'
                });
                logger_1.logger.log('error', errorLog);
            }
            //   logger.log('error', error)
            throw new errors_1.GeneralError(error);
        }
    }
    //set reminders
    // async setReminder(data: ScheduleData) {
    //   try {
    //     const response = await this.axios.post(`/payment_reminders.json`, {
    //       payment_reminder: {
    //         name: data.name,
    //         message_text: data.message,
    //         static_scheduler_details: {
    //           schedule_from: data.scheduleFrom,
    //           schedule_to: data.scheduleTo,
    //           schedule_days: [5, 30],
    //           scheduled_at: data.scheduledAt,
    //           timezone: 'Africa/Nairobi'
    //         }
    //       },
    //       device_ids: data.deviceIds
    //     })
    //     return response.data
    //   } catch (error: any) {
    //     if (error.response) {
    //       const errorLog = JSON.stringify({
    //         level: 'error',
    //         data: { ...error.response.data },
    //         message: 'FAILED TO SET REMINDERERS DATE NUOVO DEVICE'
    //       })
    //       logger.log('error', errorLog)
    //     }
    //     //   logger.log('error', error)
    //     throw new GeneralError(error)
    //   }
    // }
    async setReminder(data) {
        try {
            const response = await this.axios.post(`/payment_reminders/send_message.json`, {
                message_text: data.message,
                device_ids: data.deviceIds,
                blocked_devices: true,
                un_blocked_devices: true
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO SET REMINDERERS DATE NUOVO DEVICE'
                });
                logger_1.logger.log('error', errorLog);
            }
            //   logger.log('error', error)
            throw new errors_1.GeneralError(error);
        }
    }
}
exports.NuovoApi = NuovoApi;
//# sourceMappingURL=api.js.map