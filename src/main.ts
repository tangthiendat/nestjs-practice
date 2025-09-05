import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipe (commented out to use module-scoped pipe instead)
  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Real Estate API')
    .setDescription('API for managing properties')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/swagger-ui/index.html', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
