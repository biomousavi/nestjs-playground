import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  // @IsISO8601({ strict: true })  // for more accuracy
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  // @IsISO8601({ strict: true })  // for more accuracy
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
