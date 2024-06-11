import { IsEmail } from 'class-validator';
import { CreateChargeDto } from './create-charge.dto';

export class PaymentCrfeateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
