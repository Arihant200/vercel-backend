// src/bootstrap.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: INestApplication;

export async function bootstrapServer(): Promise<INestApplication> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init(); // Important for serverless
    cachedApp = app;
  }
  return cachedApp;
}
