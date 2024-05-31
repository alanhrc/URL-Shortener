import { Module } from '@nestjs/common'

import { LinkRepository } from '@/app/link/repositories/link.repository'
import { UserRepository } from '@/app/user/repositories/user.repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaLinkRepository } from './prisma/repositories/link/prisma-link.repository'
import { PrismaUserRepository } from './prisma/repositories/user/prisma-user.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: LinkRepository,
      useClass: PrismaLinkRepository,
    },
  ],
  exports: [UserRepository, LinkRepository],
})
export class DatabaseModule {}
