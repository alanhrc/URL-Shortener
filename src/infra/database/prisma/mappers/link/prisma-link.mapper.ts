import { Link as RawLink } from '@prisma/client'

import { Link } from '@/app/link/entities/link'

export class PrismaLinkMapper {
  static toPrisma(link: Link) {
    return {
      id: link.id,
      urlOrigin: link.urlOrigin,
      urlHash: link.urlHash,
      clicks: link.clicks,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
      deletedAt: link.deletedAt,
    }
  }

  static toDomain(raw: RawLink): Link {
    return new Link(
      {
        urlOrigin: raw.urlOrigin,
        urlHash: raw.urlHash,
        clicks: raw.clicks,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    )
  }
}
