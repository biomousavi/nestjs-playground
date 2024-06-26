import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { PAYMENTS_SERVICE, User } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,

    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, id }: User,
  ) {
    return this.paymentsService
      .send('create_charge', { ...createReservationDto, email })
      .pipe(
        map(async () => {
          const reservation = new Reservation({
            ...createReservationDto,
            timestamp: new Date(),
            userId: id,
          });
          return this.reservationRepository.create(reservation);
        }),
      );
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(id: number) {
    return this.reservationRepository.findOne({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  remove(id: number) {
    return this.reservationRepository.findOneAndDelete({ id });
  }
}
