import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentCrfeateChargeDto } from './dto/payment-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  createCharge(
    @Payload() data: PaymentCrfeateChargeDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    // manually acknowledge to say we are done with task.
    channel.ack(originalMessage);
    return this.paymentsService.createCharge(data);
  }
}
