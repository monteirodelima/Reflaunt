import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // check if role is valid
    if (createUserDto.role !== 'admin' && createUserDto.role !== 'user') {
      throw new Error('Invalid role');
    }

    // check if email already exists
    const emailExists = this.prisma.user.findFirstOrThrow({
      where: {
        email: createUserDto.email,
      },
    });
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // verify if address is valid
    if (!createUserDto.address) {
      throw new Error('Address is required');
    }

    // verify if password is valid
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }

    // verify if name is valid
    if (!createUserDto.name) {
      throw new Error('Name is required');
    }

    // verify if email is valid
    if (!createUserDto.email) {
      throw new Error('Email is required');
    }

    // create user
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        address: createUserDto.address,
        role: createUserDto.role,
      },
    });

    return user;
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
