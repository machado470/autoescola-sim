import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS CORRIGIDO PARA FRONTEND DO VITE (5173)
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite
      'http://localhost:3000', // fallback
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Habilitar cookies
  app.use(cookieParser());

  // Porta da API
  const port = process.env.PORT || 3001;

  await app.listen(port);
  console.log(`🚀 API rodando na porta ${port}`);
}

bootstrap();
