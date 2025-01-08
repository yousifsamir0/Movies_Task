import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (validationErors: ValidationError[]) => {
      const errors = {};
      validationErors.forEach(e => {
        const constrraints = Object.values(e.constraints || {});
        if (constrraints.length) {
          errors[e.property] = constrraints;
        }
      })
      return new BadRequestException({ statusCode: 400, errors })
    },

  }),)
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  })
  await app.listen(3001);
}
bootstrap();
