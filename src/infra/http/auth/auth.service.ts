import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { User } from '@/app/user/entities/user'
import { FindUserByEmail } from '@/app/user/useCases/find-user-by-email.useCase'

import { AuthenticateUserDto } from './dtos/authenticate-user.dto'
import { signToken } from './helpers'

@Injectable()
export class AuthService {
  constructor(private findUserByEmail: FindUserByEmail) {}

  async login(body: AuthenticateUserDto) {
    const { user } = await this.findUserByEmail.execute({ email: body.email })

    if (!user) {
      throw new HttpException('auth.user-not-found', HttpStatus.NOT_FOUND)
    }

    const isValidPassword = bcrypt.compareSync(body.password, user.password)

    if (!isValidPassword) {
      throw new HttpException('auth.user-not-found', HttpStatus.NOT_FOUND)
    }

    return this.handleFlagsAndToken(user)
  }

  private async handleFlagsAndToken(user: User) {
    const token = signToken({
      idUsuario: user.id,
    })

    return {
      token,
    }
  }

  async me(idUsuario: string) {
    return {
      id: idUsuario,
    }
  }
}
