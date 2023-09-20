import { DeviceData } from '../../client'
import type { HookContext } from '../../declarations'
import { logger } from '../../logger'
import { NuovoApi } from '../../nuovo/api'

export const addDevice = async (context: HookContext) => {
  const { data, result, app } = context

  // search for device
  const devices = await new NuovoApi().getAllDevices(data.mambuImei)
  console.log(devices)

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
      clientId: result.clientId
    }

    app
      .service('device')
      .create(deviceData)
      .then(async (response) => {
        logger.info('DEVICE CREATED SUCCESSFULLY')
        // update customer on nuovo
        console.log(response.client)

        const client = await app.service('client').get(response.clientId)
        const customerData = {
          device: {
            customer_name: client.fullName
          },
          device_custom_fields: [
            {
              user_custom_field_id: 632,
              value: client.idNumber
            }
          ]
        }
        await new NuovoApi()
          .updateCustomer(clientDevice.id, customerData)
          .then((nvRes) => {
            logger.info('DEVICE DATA SYNCED SUCCESSFULLY')
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
