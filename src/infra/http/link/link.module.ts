import { Module } from '@nestjs/common'

import { FindAllLinksUser } from '@/app/link/useCases/find-all-links-user.useCase'
import { ShortenerLink } from '@/app/link/useCases/shortner-link.useCase'
import { UpdateLink } from '@/app/link/useCases/update-link.useCase'
import { DatabaseModule } from '@/infra/database/database.module'

import { LinkController } from './link.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [LinkController],
  providers: [ShortenerLink, FindAllLinksUser, UpdateLink],
  exports: [ShortenerLink, FindAllLinksUser, UpdateLink],
})
export class LinkModule {}
