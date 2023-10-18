import { Get, Controller, Render, UseInterceptors, UseGuards } from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  @Get()
  @UseGuards(new AuthGuard())
  @Render('pages/index')
  async getTest(@Session() session: SessionContainer) {
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

  @Get('review')
  @Render('pages/review')
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

  @Get('registration')
  @Render('pages/registration')
  registration() {
    return {};
  }
}