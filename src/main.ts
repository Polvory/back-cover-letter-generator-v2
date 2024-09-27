import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  const prefix = 'bakv2';
  app.setGlobalPrefix(prefix);

  // Разрешаем CORS
  app.use(
    cors({
      credentials: true,
      origin: true,
    }),
  );

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('cover-letter-generator-v2')
    .setDescription('Бэкенд приложения генератор сопроводительных v2')
    .setVersion('2.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Формат токена
      },
      'JWT', // Название схемы авторизации
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Добавляем Swagger UI на /ai/docs
  SwaggerModule.setup(`${prefix}/docs`, app, document);
  // Запускаем сервер
  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/${prefix}`);
    console.log(`Swagger is running on http://localhost:${PORT}/${prefix}/docs`);
  });
}
bootstrap();
