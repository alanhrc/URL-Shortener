import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { Env } from './config/env'

async function bootstrap() {
  const logger = new Logger('Initial Log')

  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'warn', 'verbose'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('URL Shortener API description')
    .setVersion('0.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const port = configService.get('SERVER_PORT', { infer: true })
  await app.listen(port)

  logger.debug(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
