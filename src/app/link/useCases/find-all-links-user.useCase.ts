import { Injectable } from '@nestjs/common'

import { Link } from '../entities/link'
import { LinkRepository } from '../repositories/link.repository'

interface IFindAllLinksUserRequest {
  userId: string
}

export interface IFindAllLinksUserResponse {
  links: Link[]
}

@Injectable()
export class FindAllLinksUser {
  constructor(private linkRepository: LinkRepository) {}

  async execute(
    request: IFindAllLinksUserRequest,
  ): Promise<IFindAllLinksUserResponse> {
    const { userId } = request

    const links = await this.linkRepository.findAllByUserId(userId)

    return {
      links,
    }
  }
}
