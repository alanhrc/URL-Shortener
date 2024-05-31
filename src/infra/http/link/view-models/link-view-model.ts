import { Link } from '@/app/link/entities/link'

export class LinkViewModel {
  static toHTTP(link: Link) {
    return {
      id: link.id,
      urlOrigin: link.urlOrigin,
      urlHash: link.urlHash,
      clicks: link.clicks,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
      deletedAt: link.deletedAt,
      userId: link.userId,
    }
  }
}
