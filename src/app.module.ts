import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserController } from './models/user/user.controller';
import { UserModule } from './models/user/user.module';
import { UserService } from './models/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
