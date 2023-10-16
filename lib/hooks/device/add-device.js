"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDevice = void 0;
const logger_1 = require("../../logger");
const mambu_1 = __importDefault(require("../../mambu"));
const api_1 = require("../../nuovo/api");
const utils_1 = __importDefault(require("../../utils"));
const addDevice = async (context) => {
    const { data, result, app } = context;
    // search for device
    const devices = await new api_1.NuovoApi().getAllDevices(data.mambuImei);
    // get mambu installments
    const installments = await new mambu_1.default().getLoanInstallment(result.accountId);
    const installment = installments.installments.filter((installment) => installment.state === 'PENDING' || installment.state === 'LATE' || installment.state == 'PARTIALLY_PAID')[0];
    const clientDevice = devices.devices.filter((device) => device.imei_no === data.mambuImei || device.imei_no2 === data.mambuImei)[0];
    if (clientDevice) {
        const deviceData = {
            imei: clientDevice.imei_no,
            loanId: result.id,
            status: clientDevice.is_activated ? 'ACTIVE' : 'PENDING',
            serialNo: clientDevice.serial_no,
            make: clientDevice.make,
            model: clientDevice.model,
            locked: clientDevice.locked,
            clientId: result.clientId,
            nuovoDeviceId: clientDevice.id,
            scheduleNumber: +installment.number
        };
        app
            .service('device')
            .create(deviceData)
            .then(async (response) => {
            logger_1.logger.info('DEVICE CREATED SUCCESSFULLY');
            // update customer on nuovo
            const client = await app.service('client').get(response.clientId);
            const clientNames = client.fullName.split(' ');
            const customerData = {
                device: {
                    first_lock_date: installment.dueDate,
                    user: {
                        first_name: clientNames[0],
                        last_name: clientNames[1],
                        phone: client.phoneNumber,
                        // email: 'test@gmail.com',
                        // address: 'Pune',
                        country: 'KE'
                    },
                    device_custom_fields: [
                        {
                            user_custom_field_id: 645,
                            value: client.idNumber
                        }
                    ]
                }
            };
            await new api_1.NuovoApi()
                .updateCustomer(clientDevice.id, customerData)
                .then((nvRes) => {
                logger_1.logger.info('DEVICE DATA SYNCED SUCCESSFULLY:NUOVO');
                //TODO:update mambu-nuovo sync status
                // update nuovo lock dates
                new api_1.NuovoApi()
                    .scheduleDeviceLock([clientDevice.id], installment.dueDate)
                    .then(() => {
                    // update local device
                    app
                        .service('device')
                        ._patch(response.id, {
                        lockDateSynced: true,
                        initialLockDate: new Date(installment.dueDate),
                        nextLockDate: new Date(installment.dueDate)
                    })
                        .catch((error) => {
                        logger_1.logger.error(JSON.stringify({
                            level: 'error',
                            message: 'FAILED TO UPDATED DEVICE LOCK DATES',
                            data: error
                        }));
                    });
                })
                    .catch((error) => {
                    console.log(error);
                });
                app
                    .service('device')
                    ._patch(response.id, { nuovoSynced: true, nuovoSyncedAt: new Date() })
                    .then((nuovo) => {
                    // update mambu details
                    const nuvoDate = clientDevice.last_connected_at.split('-');
                    const newDate = `${nuvoDate[1]}-${nuvoDate[0]}-${nuvoDate[2]}`;
                    console.log(newDate);
                    const pathData = {
                        customInformation: [
                            {
                                customFieldID: 'DD_012',
                                value: clientDevice.id
                            },
                            {
                                customFieldID: 'WC_05',
                                value: 'Yes'
                            },
                            {
                                customFieldID: 'AL_01',
                                value: 20000
                            },
                            {
                                customFieldID: 'DC_02',
                                value: 'Yes'
                            },
                            {
                                customFieldID: 'PM_08',
                                value: clientDevice.model || 'Not Recorded'
                            },
                            {
                                customFieldID: 'PIN_06',
                                value: clientDevice.imei_no || 'Not Recorded'
                            },
                            {
                                customFieldID: 'PSN_07',
                                value: clientDevice.serial_no || 'Not Recorded'
                            },
                            {
                                customFieldID: 'PS_09',
                                value: clientDevice.status == 'registered' || clientDevice.status == 'enrolled'
                                    ? 'Enrolled'
                                    : 'Unregistered'
                            },
                            {
                                customFieldID: 'CN_010',
                                value: clientDevice.customer_name || 'Not Recorded'
                            },
                            {
                                customFieldID: 'DN_013',
                                value: clientDevice.name || 'Not Recorded'
                            },
                            {
                                customFieldID: 'Lastconnected',
                                value: utils_1.default.addDateTimeZone(newDate)
                            }
                        ]
                    };
                    new mambu_1.default().updateLoan(result.accountId, pathData).then(() => {
                        logger_1.logger.info('DEVICE DATA SYNCED SUCCESSFULLY:MAMBU');
                        app.service('device')._patch(response.id, { mambuSynced: true, mambuSyncedAt: new Date() });
                    });
                })
                    .catch((error) => {
                    console.log(error);
                });
            })
                .catch((ERR) => {
                console.log(ERR);
            });
        })
            .catch((error) => {
            logger_1.logger.error(error);
        });
    }
};
exports.addDevice = addDevice;
//# sourceMappingURL=add-device.js.map