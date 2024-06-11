import { CreateChargeDto } from 'apps/payments/src/dto/create-charge.dto';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
