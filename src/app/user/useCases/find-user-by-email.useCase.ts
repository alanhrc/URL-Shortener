import { Injectable } from '@nestjs/common'

import { User } from '../entities/user'
import { UserRepository } from '../repositories/user.repository'

interface IFindUserByEmailRequest {
  email: string
}

interface IFindUserByEmailResponse {
  user: User | null
}

@Injectable()
export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: IFindUserByEmailRequest,
  ): Promise<IFindUserByEmailResponse> {
    const { email } = request

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    return { user: userAlreadyExists }
  }
}
