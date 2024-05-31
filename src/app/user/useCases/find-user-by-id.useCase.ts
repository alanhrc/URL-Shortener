import { Injectable } from '@nestjs/common'

import { User } from '../entities/user'
import { UserRepository } from '../repositories/user.repository'

interface IFindUserByIdRequest {
  userId: string
}

export interface IFindUserByIdResponse {
  user: User | null
}

@Injectable()
export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: IFindUserByIdRequest): Promise<IFindUserByIdResponse> {
    const { userId } = request

    const userAlreadyExists = await this.userRepository.findById(userId)

    return { user: userAlreadyExists }
  }
}
