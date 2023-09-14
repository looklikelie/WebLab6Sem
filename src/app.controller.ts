import { Get, Controller, Render, UseInterceptors, Param,
  Post,
  Body,
  Put,
  Delete,} from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { UserService } from './user.service';
import { PostService } from './post.service';
import { User as UserModel, Product as ProductModel, Order as OrderModel,  Review as ReviewModel} from '@prisma/client';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  constructor(
      private readonly userService: UserService,
      private readonly postService: PostService,
  ) {}
  @Get()
  @Render('pages/index')
  root() {
    return {};
  }

  @Get('index')
  @Render('pages/index')
  root1() {
    return {};
  }

  @Get('about')
  @Render('pages/about')
  root2() {
    return {};
  }

  @Get('api')
  @Render('pages/api')
  root3() {
    return {};
  }

  @Get('contacts')
  @Render('pages/contacts')
  root4() {
    return {};
  }

  @Get('wishlist')
  @Render('pages/wishlist')
  root5() {
    return {};
  }
}