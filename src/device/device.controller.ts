import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { DeviceInterface } from './device.interface'
import { DeviceService } from './device.service'
import * as snmp from 'snmp-native'
import { Observable } from 'rxjs'
import { DeviceBody } from './device-body.dto'

@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Get(':deviceName')
    async getDeviceData(@Param('deviceName') deviceName: string): Promise<DeviceInterface> {
        return this.deviceService.getDeviceData(deviceName)
    }

    // Up value = 1
    // Down value = 2
    @Post('shutdown')
    async shutdownDevice(@Body() body: DeviceBody) {
        console.log(body)
        const device = new snmp.Session({ host: body.deviceIp, community: 'public' })
        device.set({ oid: body.oid, value: 2, type: 2 }, function (error, varbind) {
          console.log(varbind)
          if (error) {
              console.log('Fail :(');
              console.log(error)
          } else {
              console.log('The set is done.');
          }
      });
      //  const result = new Observable(observer => {
        //    device.set({ oid: body.oid, value: 2, type: 64 }, (err, varbinds) => {
                // observer.next(varbinds[0].value)
          //      observer.complete()
           // })
        //})

        // return result
    }

    @Post('start')
    async startDevice(@Body() body: DeviceBody) {
        const device = new snmp.Session({ host: body.deviceIp, community: 'public' })
        const result = new Observable(observer => {
            device.set({ oid: body.oid , value: 1 }, (err, varbinds) => {
                observer.next(varbinds[0].value)
                observer.complete()
            })
        })

        return result
    }
}
