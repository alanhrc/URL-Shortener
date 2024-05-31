import { Injectable } from '@nestjs/common'

import { LinkRepository } from '../repositories/link.repository'

interface IValidateLinkRequest {
  shortLink: string
}

export interface IValidateLinkResponse {
  urlOrigin: string
}

@Injectable()
export class ValidateLink {
  constructor(private linkRepository: LinkRepository) {}

  async execute(
    request: IValidateLinkRequest,
  ): Promise<IValidateLinkResponse | null | undefined> {
    const { shortLink } = request

    if (!shortLink) return null

    const linkExists = await this.linkRepository.findByShortLink(shortLink)

    if (!linkExists) return null

    await this.linkRepository.updateClicks(linkExists.id)

    return { urlOrigin: linkExists.urlOrigin }
  }
}
