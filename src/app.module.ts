import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {UserService} from "./user/user.service";
import {ReviewModule} from "./Review/review.module";
import {ReviewService} from "./Review/review.service";
import {OrderModule} from "./Order/order.module";
import {OrderService} from "./Order/order.service";
import {ProductModule} from "./Product/product.module";
import {ProductService} from "./Product/product.service";
import {PrismaService} from "./prisma.service";
import { APP_FILTER } from '@nestjs/core';
import {HttpExceptionFilter} from "./http-exception.filter";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, OrderModule, ProductModule, ReviewModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, ReviewService, ProductService, OrderService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },],
})
export class AppModule {}
