import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { Role, User } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ email, password, roles }: CreateUserDto) {
    await this.validateCreateUserDto({ email, password });

    const user = new User({
      email,
      roles: roles?.map((role) => new Role(role)),
      password: await bcrypt.hash(password, 10),
    });

    return this.userRepository.create(user);
  }

  private async validateCreateUserDto({ email }: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exist!');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('User is not valid.');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne(getUserDto, { roles: true });
  }
}
