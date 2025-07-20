// src/main.ts
import * as dotenv from 'dotenv';
dotenv.config(); // Keep for local development if you use .env files there

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';



// src/main.ts
import { bootstrapServer } from './bootstrap';

async function start() {
  const app = await bootstrapServer();
   app.enableCors({
      // Your CORS options
    });
    app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
start();
