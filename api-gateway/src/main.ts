import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// FIX: TypeError: Do not know how to serialize a BigInt
import './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.APP_API_PREFIX || '');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Number(process.env.APP_API_PORT) || 3000);
}
bootstrap();
