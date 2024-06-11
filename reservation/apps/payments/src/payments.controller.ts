import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCrfeateChargeDto } from './dto/payment-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  createCharge(@Payload() data: PaymentCrfeateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
