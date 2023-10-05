import { Device, DeviceLockHistory, DeviceLockHistoryData } from '../../client'
import { Application } from '../../declarations'
import { NuovoApi } from '../../nuovo/api'

export class LockDevice {
  constructor(private app: Application) {}

  fetchAllPendingLocks() {
    return this.app.service('device')._find({
      query: {
        lockReady: true
        // $and: [
        //   {
        //     lockReadyScheduleAt: {
        //       $lt: new Date().valueOf()
        //     }
        //   }
        // ]
      },
      paginate: false
    })
  }

  fetchLockedDevices() {
    return this.app.service('device').find({
      query: {
        locked: true
      },
      paginate: false
    })
  }

  saveLockHistory(data: any) {
    return this.app.service('device-lock-history')._create(data)
  }

  lockDevice(deviceId: number[]): Promise<any> {
    return new NuovoApi().lockDevice(deviceId)
  }

  unlockDevice(deviceId: number[]): Promise<any> {
    return new NuovoApi().unlockDevice(deviceId)
  }

  updateDevice(devicesId: number[]) {
    this.app.service('device')._patch(
      null,
      { locked: true },
      {
        query: {
          id: {
            $in: devicesId
          }
        }
      }
    )
  }

  updateOneDevice(deviceId: number, data: any) {
    return this.app.service('device')._patch(deviceId, data)
  }

  applyLock(nuovoDeviceId: number[], devices: Device[], lockType: 'lock' | 'unlock') {
    if (lockType == 'lock') {
      this.lockDevice(nuovoDeviceId).then((response) => {
        // update device
        let deviceIds = devices.map((device) => device.id)
        this.updateDevice(deviceIds)
        devices.forEach((device) => {
          this.saveLockHistory({
            reason: 'late payment',
            lockedAt: new Date(),
            deviceId: device.id,
            loanId: device.loanId
          })
        })
      })
    } else {
    }
  }
}