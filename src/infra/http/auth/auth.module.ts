import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthenticateUser } from '@/app/auth/useCases/authenticate-user.useCase'
import { Env } from '@/config/env'

import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('SERVER_JWT_SECRET', { infer: true })

        return {
          secret,
          signOptions: {
            expiresIn: '1d',
          },
        }
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticateUser, JwtStrategy, JwtService],
  exports: [AuthenticateUser, JwtStrategy, JwtService],
})
export class AuthModule {}
