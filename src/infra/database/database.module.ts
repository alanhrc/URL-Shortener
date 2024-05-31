import { Module } from '@nestjs/common'

import { UserRepository } from '@/app/user/repositories/user.repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaUserRepository } from './prisma/repositories/user/prisma-user.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
