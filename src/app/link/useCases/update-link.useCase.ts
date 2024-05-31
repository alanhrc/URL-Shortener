import { Injectable } from '@nestjs/common'

import { LinkRepository } from '../repositories/link.repository'

interface IFindAllLinksUserRequest {
  linkId: string
  urlOrigin: string
}

@Injectable()
export class UpdateLink {
  constructor(private linkRepository: LinkRepository) {}

  async execute(request: IFindAllLinksUserRequest): Promise<void> {
    const { linkId, urlOrigin } = request

    await this.linkRepository.updateLinkURL(linkId, urlOrigin)
  }
}
