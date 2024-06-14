import { CreateChargeDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCrfeateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
