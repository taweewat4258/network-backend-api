import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class DeviceBody {
    @IsNotEmpty()
    deviceIp: string
    @IsNotEmpty()
    oid: any
}
