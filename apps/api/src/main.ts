import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  const port = process.env.PORT || 3001;   // <- AQUI É O SEGREDO

  await app.listen(port);
  console.log(`🚀 API rodando na porta ${port}`);
}

bootstrap();
