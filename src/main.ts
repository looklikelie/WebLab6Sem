import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  if (port === undefined){
    await app.listen(3000)
  }
  else{
    await app.listen(port);
  }
}
bootstrap();
