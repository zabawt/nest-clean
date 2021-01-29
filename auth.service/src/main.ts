import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './application/auth.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { cors: true });
  app
    .useGlobalPipes(new ValidationPipe())
    .use(compression())
    .use(cookieParser())
    .useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setDescription('v1')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
