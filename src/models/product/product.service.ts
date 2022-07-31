import { User } from '.prisma/client';
import {
  Injectable,
  NotAcceptableException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });

    return product;
  }

  findAll() {
    const products = this.prisma.product.findMany();
    return products;
  }

  async findOneByUrlName(urlName: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        urlName: urlName,
      },
    });
    return product;
  }

  async findOneById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { categories: { select: { name: true } } },
      rejectOnNotFound: true,
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.prisma.product.update({
      where: {
        id: id,
      },
      data: { ...updateProductDto },
    });
    return product;
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return product;
  }
}
