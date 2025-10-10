import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const port = Number(process.env.PORT ?? 3333)

  await app.listen(port)
  const url = await app.getUrl()
  console.log(`🚗 AutoEscola API is running on ${url}`)
}

bootstrap()
