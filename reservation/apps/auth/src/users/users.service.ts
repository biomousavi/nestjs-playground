import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ email, password }: CreateUserDto) {
    return this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('User is not valid.');
    }

    return user;
  }
}
