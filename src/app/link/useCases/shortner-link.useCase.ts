import { Injectable } from '@nestjs/common'

import { Link } from '../entities/link'
import { LinkRepository } from '../repositories/link.repository'

interface IShortenerLinkRequest {
  url: string
}

interface IShortenerLinkResponse {
  shortURL: string
}

@Injectable()
export class ShortenerLink {
  constructor(private linkRepository: LinkRepository) {}

  async execute(
    request: IShortenerLinkRequest,
  ): Promise<IShortenerLinkResponse> {
    const { url } = request

    const newLink = new Link({
      urlOrigin: url,
      urlHash: 'hash',
      clicks: 0,
    })

    await this.linkRepository.create(newLink)

    return {
      shortURL: url,
    }
  }
}
