import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const httpPort = configService.get<string>('RESERVATIONS_HTTP_PORT')!;
  await app.listen(httpPort, () => {
    console.log('-- Reservation service running on port', httpPort);
  });
}
bootstrap();
