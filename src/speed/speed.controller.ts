import { Controller, Get, Query, Param } from '@nestjs/common'
import { SpeedService } from './speed.service'
import { SpeedInterface } from './speed.interface'
import { GetSpeedQuery } from './speed.dto'

@Controller('speed')
export class SpeedController {
    constructor(private readonly speedService: SpeedService) {}

    @Get()
    async getSpeedData(): Promise<SpeedInterface[]> {
        return this.speedService.getSpeedData()
    }

    @Get('/:deviceName')
    async getSpeedByNetwork(@Param('deviceName') deviceName: string, @Query() queryData: GetSpeedQuery): Promise<SpeedInterface[]> {
        return this.speedService.getSpeedByNetworkData(deviceName, queryData)
    }
}
