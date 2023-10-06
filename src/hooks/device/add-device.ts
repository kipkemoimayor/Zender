import { DeviceData } from '../../client'
import type { HookContext } from '../../declarations'
import { logger } from '../../logger'
import Mambu from '../../mambu'
import { NuovoApi } from '../../nuovo/api'

export const addDevice = async (context: HookContext) => {
  const { data, result, app } = context

  // search for device
  const devices = await new NuovoApi().getAllDevices(data.mambuImei)

  const clientDevice = devices.devices.filter(
    (device) => device.imei_no === data.mambuImei || device.imei_no2 === data.mambuImei
  )[0]

  if (clientDevice) {
    const deviceData: DeviceData = {
      imei: clientDevice.imei_no,
      loanId: result.id,
      status: clientDevice.is_activated ? 'ACTIVE' : 'PENDING',
      serialNo: clientDevice.serial_no,
      make: clientDevice.make,
      model: clientDevice.model,
      locked: clientDevice.locked,
      clientId: result.clientId,
      nuovoDeviceId: clientDevice.id
    }

    app
      .service('device')
      .create(deviceData)
      .then(async (response) => {
        logger.info('DEVICE CREATED SUCCESSFULLY')
        // update customer on nuovo
        console.log(response.client)

        const client = await app.service('client').get(response.clientId)
        const clientNames = client.fullName.split(' ')
        const customerData = {
          device: {
            user: {
              first_name: clientNames[0],
              last_name: clientNames[1],
              // phone: '9876543210',
              // email: 'test@gmail.com',
              // address: 'Pune',
              country: 'KE'
            }
          }
        }
        await new NuovoApi()
          .updateCustomer(clientDevice.id, customerData)
          .then((nvRes) => {
            logger.info('DEVICE DATA SYNCED SUCCESSFULLY:NUOVO')
            //TODO:update mambu-nuovo sync status
            app
              .service('device')
              ._patch(response.id, { nuovoSynced: true, nuovoSyncedAt: new Date() })
              .then((nuovo) => {
                // update mambu details
                const pathData = {
                  customInformation: [
                    {
                      customFieldID: 'DD_012', // Device ID
                      value: clientDevice.id
                    },
                    {
                      customFieldID: 'WC_05', // Whitelisting Of Client
                      value: 'Yes'
                    },
                    {
                      customFieldID: 'AL_01', // Approved limit
                      value: 20000
                    },
                    {
                      customFieldID: 'DC_02', // doc compliance
                      value: 'Yes'
                    },
                    {
                      customFieldID: 'PM_08', // model
                      value: clientDevice.model || 'Not Recorded'
                    },
                    {
                      customFieldID: 'PIN_06', // IMEI
                      value: clientDevice.imei_no || 'Not Recorded'
                    },
                    {
                      customFieldID: 'PSN_07', // S.N
                      value: clientDevice.serial_no || 'Not Recorded'
                    },
                    {
                      customFieldID: 'PS_09', // STATUS
                      value:
                        clientDevice.status == 'registered' || clientDevice.status == 'enrolled'
                          ? 'Enrolled'
                          : 'Unregistered'
                    },
                    {
                      customFieldID: 'CN_010', // Customer Name
                      value: clientDevice.customer_name || 'Not Recorded'
                    },
                    {
                      customFieldID: 'DN_013', // Device Name
                      value: clientDevice.name || 'Not Recorded'
                    }
                  ]
                }
                new Mambu().updateLoan(result.accountId, pathData).then(() => {
                  logger.info('DEVICE DATA SYNCED SUCCESSFULLY:MAMBU')
                  app.service('device')._patch(response.id, { mambuSynced: true, mambuSyncedAt: new Date() })
                })
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((ERR) => {
            console.log(ERR)
          })
      })
      .catch((error) => {
        logger.error(error)
      })
  }
}
