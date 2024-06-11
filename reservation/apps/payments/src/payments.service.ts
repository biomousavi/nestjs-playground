import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICAITONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCrfeateChargeDto } from './dto/payment-create-charge.dto';
@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(NOTIFICAITONS_SERVICE)
    private readonly notificaitonService: ClientProxy,
  ) {}
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY')!,
    {
      apiVersion: '2024-04-10',
    },
  );
  async createCharge({ card, amount, email }: PaymentCrfeateChargeDto) {
    this.notificaitonService.emit('notify_email', { email });
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card,
      });

      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: amount * 100,
        confirm: true,
        payment_method_types: ['card'],
        currency: 'usd',
      });

      return paymentIntent;
    } catch (error) {
      console.log('stripe error', error);
    }
  }
}
