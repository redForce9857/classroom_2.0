import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret:'sessionSecret',
    saveUninitialized:false,
    cookie:{
      maxAge:60000,
    }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Google Classroom')
    .setDescription('Google Classroom Documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  // const PORT = 3000;

  await app.listen(PORT || 5000, () => {
    Logger.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();
