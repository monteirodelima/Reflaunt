import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // role != admin && role != user
    if (
      createUserDto.role !== 'admin' &&
      createUserDto.role !== 'user' &&
      createUserDto.role !== undefined &&
      createUserDto.role !== null
    ) {
      throw new NotFoundException('Role not found');
    }

    // // check if email already exists
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (emailExists) {
      throw new NotFoundException(
        `Email ${createUserDto.email} already exists`,
      );
    }

    // create user
    const user = await this.prisma.user.create({
      data: { ...createUserDto },
    });

    return user;
  }
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // check if user exists
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userExist) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        password: updateUserDto.password,
        address: updateUserDto.address,
      },
    });
    return user;
  }

  async remove(id: string) {
    // check if user exists
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }
}
