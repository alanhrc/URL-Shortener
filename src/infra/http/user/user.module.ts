import { Module } from '@nestjs/common'

import { CreateUser } from '@/app/user/useCases/create-user.useCase'
import { FindUserByEmail } from '@/app/user/useCases/find-user-by-email.useCase'
import { FindUserById } from '@/app/user/useCases/find-user-by-id.useCase'
import { DatabaseModule } from '@/infra/database/database.module'

import { UserController } from './user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, FindUserByEmail, FindUserById],
  exports: [CreateUser, FindUserByEmail, FindUserById],
})
export class UserModule {}
