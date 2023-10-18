import { Get, Controller, Render, UseInterceptors } from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
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

  @Get('help')
  @Render('pages/help')
  @ApiExcludeEndpoint(true)
  help() {
    return {};
  }
}