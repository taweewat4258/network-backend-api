import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class GetSpeedQuery {
  @IsNumber()
  @Type(() => Number)
  startAt: number

  @IsNumber()
  @Type(() => Number)
  endAt: number
}
