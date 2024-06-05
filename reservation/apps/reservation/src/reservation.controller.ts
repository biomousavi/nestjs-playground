import { Controller, Get } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller()
export class ReservationController {
  constructor(private readonly appService: ReservationService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
