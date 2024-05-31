import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { User } from '../entities/user'
import { UserEmailAlreadyExistsError } from '../erros/user-email-already-exists.error'
import { UserRepository } from '../repositories/user.repository'
import { FindUserByEmail } from './find-user-by-email.useCase'

interface ICreateUserRequest {
  name: string
  email: string
  password: string
}

interface ICreateUserResponse {
  user: User
}

@Injectable()
export class CreateUser {
  constructor(
    private findUserByEmail: FindUserByEmail,
    private userRepository: UserRepository,
  ) {}

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { name, email, password } = request

    const { user } = await this.findUserByEmail.execute({ email })

    if (user) {
      throw new UserEmailAlreadyExistsError()
    }

    const passwordHashed = await hash(password, 6)

    const newUser = new User({
      name,
      email,
      password: passwordHashed,
    })

    await this.userRepository.create(newUser)

    return {
      user: newUser,
    }
  }
}
