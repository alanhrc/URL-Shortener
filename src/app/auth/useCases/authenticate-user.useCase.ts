import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { Env } from '@/config/env'

import { FindUserByEmail } from '../../user/useCases/find-user-by-email.useCase'
import { AuthenticateUserError } from './erros/authenticate-user.error'

interface IAuthenticateUserRequest {
  email: string
  password: string
}

interface IAuthenticateUserResponse {
  access_token: string
}

@Injectable()
export class AuthenticateUser {
  constructor(
    private findUserByEmail: FindUserByEmail,
    private jwtService: JwtService,
  ) {}

  async execute(
    request: IAuthenticateUserRequest,
  ): Promise<IAuthenticateUserResponse> {
    const { email, password } = request

    const { user } = await this.findUserByEmail.execute({ email })

    if (!user) {
      throw new AuthenticateUserError()
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AuthenticateUserError()
    }

    const config = new ConfigService<Env, true>()
    const secret = config.get('SERVER_JWT_SECRET', {
      infer: true,
    })

    const token = await this.jwtService.signAsync({ sub: user.id }, { secret })

    return {
      access_token: token,
    }
  }
}
