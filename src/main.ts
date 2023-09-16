import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  const config = new DocumentBuilder()
      .setTitle('SNDs example')
      .setDescription('The SND API description')
      .setVersion('1.0')
      .addTag('SND')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const hbs = require('hbs');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');

  const port = process.env.PORT;
  if (port === undefined){
    await app.listen(3000)
  }
  else{
    await app.listen(port);
  }
}
bootstrap();
