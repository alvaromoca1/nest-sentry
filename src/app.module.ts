import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { WebhookInterceptor } from './webhook.interceptor';

@Module({
  imports: [
    RavenModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // Designar como interceptor global
      useClass: WebhookInterceptor,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            // Filtrar excepciones de tipo HttpException.
            // Ignore aquellos que tienen un código de estado de menos de 500
            filter: (exception: HttpException) => {
              return 500 > exception.getStatus();
            },
          },
        ],
      }),
    },
  ],
})
export class AppModule { }
