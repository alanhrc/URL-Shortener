import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Env } from '@/config/env'

import { GenerateHashURL } from '../../..//helpers/GenerateHashURL'
import { Link } from '../entities/link'
import { LinkRepository } from '../repositories/link.repository'

interface IShortenerLinkRequest {
  url: string
  userId: string | null
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
    const { url, userId } = request

    const hash = await this.generateUniqueHash(6)

    const newLink = new Link({
      urlOrigin: url,
      urlHash: hash,
      clicks: 0,
      userId,
    })

    await this.linkRepository.create(newLink)

    const config = new ConfigService<Env, true>()
    const urlServer = config.get('SERVER_URL_LINK', {
      infer: true,
    })

    return {
      shortURL: urlServer + hash,
    }
  }

  private async isHashExists(hash: string): Promise<boolean> {
    const count = await this.linkRepository.countByHash(hash)
    return count > 0
  }

  private async generateUniqueHash(length: number): Promise<string> {
    let hash: string
    let exists: boolean
    do {
      hash = GenerateHashURL(length)
      exists = await this.isHashExists(hash)
    } while (exists)
    return hash
  }
}
