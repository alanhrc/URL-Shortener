import { Module } from '@nestjs/common'

import { ShortenerLink } from '@/app/link/useCases/shortner-link.useCase'
import { DatabaseModule } from '@/infra/database/database.module'

import { LinkController } from './link.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [LinkController],
  providers: [ShortenerLink],
  exports: [ShortenerLink],
})
export class LinkModule {}
