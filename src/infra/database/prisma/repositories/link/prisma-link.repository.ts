import { Injectable } from '@nestjs/common'

import { Link } from '@/app/link/entities/link'
import { LinkRepository } from '@/app/link/repositories/link.repository'

import { PrismaLinkMapper } from '../../mappers/link/prisma-link.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaLinkRepository implements LinkRepository {
  constructor(private prismaService: PrismaService) {}
  async create(link: Link): Promise<void> {
    const raw = PrismaLinkMapper.toPrisma(link)

    await this.prismaService.link.create({
      data: raw,
    })
  }

  async findAllByUserId(userId: string): Promise<Link[]> {
    const links = await this.prismaService.link.findMany({
      where: {
        userId,
      },
    })

    return links.map(PrismaLinkMapper.toDomain)
  }

  async updateLinkURL(
    linkId: string,
    urlOrigin: string,
    userId: string,
  ): Promise<void> {
    await this.prismaService.link.update({
      where: {
        id: linkId,
        userId,
      },
      data: {
        urlOrigin,
      },
    })
  }

  async findByShortLink(shortLink: string): Promise<Link | null> {
    const link = await this.prismaService.link.findFirst({
      where: {
        urlHash: shortLink,
      },
    })

    if (!link) {
      return null
    }

    return PrismaLinkMapper.toDomain(link)
  }

  async updateClicks(linkId: string): Promise<void> {
    const link = await this.prismaService.link.findFirst({
      where: {
        id: linkId,
      },
    })

    if (link) {
      await this.prismaService.link.update({
        where: {
          id: link.id,
        },
        data: {
          clicks: link.clicks + 1,
        },
      })
    }
  }

  async countByHash(hash: string): Promise<number> {
    const count = await this.prismaService.link.count({
      where: {
        urlHash: hash,
      },
    })

    return count
  }
}
