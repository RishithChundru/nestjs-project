import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // it will remove non defined fields in DTO file
      forbidNonWhitelisted: false,  // extra fields that we try to insert will be ignored and also they will not throw errors
      transform: true, // it will automatically converts incoming request data into DTO class
    }),
  );

  await app.listen(3000);
}
bootstrap();
