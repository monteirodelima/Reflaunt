import {
  Injectable,
  NotAcceptableException,
  HttpException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  //verify if is admin
  async isAdmin(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user.role !== 'admin') {
      throw new NotAcceptableException('You are not admin');
    } else {
      return true;
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // check if product already exists
    const productExist = await this.prisma.product.findUnique({
      where: {
        name: createProductDto.name,
      },
    });
    if (productExist) {
      throw new NotAcceptableException(
        `Product ${createProductDto.name} already exists`,
      );
    }

    // create product
    const product = await this.prisma.product.create({
      data: { ...createProductDto },
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

  async findOneById(id: string): Promise<Product> {
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
