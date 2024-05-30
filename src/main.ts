import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import type { Env } from './config/env'

async function bootstrap() {
  const logger = new Logger('Initial Log')

  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'warn', 'verbose'],
  })

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('SERVER_PORT', { infer: true })

  await app.listen(port)

  logger.debug(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
