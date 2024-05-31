import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envSchema } from './config/env'
import { AuthModule } from './infra/http/auth/auth.module'
import { HostModule } from './infra/http/host/host.module'
import { LinkModule } from './infra/http/link/link.module'
import { UserModule } from './infra/http/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    HostModule,
    UserModule,
    AuthModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
