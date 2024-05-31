import { Module } from '@nestjs/common'

import { ValidateLink } from '@/app/link/useCases/validate-link.useCase'
import { DatabaseModule } from '@/infra/database/database.module'

import { HostController } from './host.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [HostController],
  providers: [ValidateLink],
  exports: [ValidateLink],
})
export class HostModule {}
