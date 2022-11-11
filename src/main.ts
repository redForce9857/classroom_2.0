// import {
//   ClassSerializerInterceptor,
//   Logger,
//   ValidationPipe,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { NestFactory, Reflector } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import * as passport from 'passport';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // app.enableCors({
//   //   origin: '*',
//   //   credentials: true,
//   // });
//    app.setGlobalPrefix('api');

//   app.useGlobalPipes(new ValidationPipe());
//   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

//   const config = new DocumentBuilder()
//     .addBearerAuth()
//     .setTitle('Google Classroom')
//     .setDescription('Google Classroom Documentation')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   app.use(passport.initialize());

//   const configService = app.get(ConfigService);
//   const PORT = configService.get('PORT');

//   await app.listen(PORT || 5000, () => {
//     Logger.log(`Server started on PORT ${PORT}`);
//   });
// }
// bootstrap();
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

  await app.listen(PORT || 5000, () => {
    Logger.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();
