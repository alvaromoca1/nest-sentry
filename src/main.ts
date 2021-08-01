import { NestFactory } from '@nestjs/core';
import { init as SentryInit } from '@sentry/node';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SentryInit({
    dsn: 'https://e3441437567743e6b65edde72b6ff1d8@o575899.ingest.sentry.io/5887418',
  });
  await app.listen(3000);
}
bootstrap();
