import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AppService } from './app.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  )

  const configService = app.get(ConfigService)
  const appService = app.get(AppService)

  const corsOrigins = configService.get<string>('CORS_ORIGINS')
  const defaultOrigins = [
    'http://localhost:5173',
    'https://autoescola-sim.vercel.app',
  ]

  const origins = corsOrigins
    ? corsOrigins.split(',').map((origin) => origin.trim()).filter(Boolean)
    : defaultOrigins

  app.enableCors(
    origins.length > 0
      ? {
          origin: origins,
        }
      : undefined,
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AutoEscola Sim')
    .setDescription('API documentation for AutoEscola Sim')
    .setVersion(appService.getVersion())
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
      },
      'JWT',
    )
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const port = Number(configService.get('API_PORT') ?? 8080)

  await app.listen(port)
  const url = await app.getUrl()
  console.log(`🚗 AutoEscola API is running on ${url}`)
}

bootstrap()
