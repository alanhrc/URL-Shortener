import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { User } from '../entities/user'
import { UserRepository } from '../repositories/user.repository'
import { UserEmailAlreadyExistsError } from './erros/user-email-already-exists.error'

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
  constructor(private userRepository: UserRepository) {}

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { name, email, password } = request

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserEmailAlreadyExistsError()
    }

    const passwordHashed = await hash(password, 6)

    const user = new User({
      name,
      email,
      password: passwordHashed,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}
