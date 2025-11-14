import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Se quiser prefixo depois, dá pra colocar aqui:
  // app.setGlobalPrefix('api');

  await app.listen(parseInt(process.env.PORT || '3000', 10), '0.0.0.0');
  console.log('🚀 API running on http://localhost:3000');
}
bootstrap();
