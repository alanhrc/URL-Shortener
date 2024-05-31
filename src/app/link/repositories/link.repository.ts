import { Link } from '../entities/link'

export abstract class LinkRepository {
  abstract create(link: Link): Promise<void>
  abstract findAllByUserId(userId: string): Promise<Link[]>
  abstract updateLinkURL(
    linkId: string,
    urlOrigin: string,
    userId: string,
  ): Promise<void>

  abstract findByShortLink(shortLink: string): Promise<Link | null>
  abstract updateClicks(linkId: string): Promise<void>
  abstract countByHash(hash: string): Promise<number>
}
