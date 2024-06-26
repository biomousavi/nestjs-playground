import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, NOTIFICAITONS_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICAITONS_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')!],
            queue: 'notifications',
          },
        }),
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_TCP_PORT: Joi.number().required(),
        PAYMENTS_TCP_PORT: Joi.number().required(),
      }),
    }),
    HealthModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
