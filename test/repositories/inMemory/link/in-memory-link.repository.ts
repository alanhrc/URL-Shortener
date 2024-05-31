import { Link } from '@/app/link/entities/link'
import { LinkRepository } from '@/app/link/repositories/link.repository'

export class InMemoryLinkRepository implements LinkRepository {
  public links: Link[] = []

  async create(link: Link) {
    this.links.push(link)
  }

  async findAllByUserId(userId: string): Promise<Link[]> {
    const links = this.links.filter((item) => item.userId === userId)

    return links
  }

  async updateLinkURL(linkId: string, urlOrigin: string): Promise<void> {
    const linkIndex = this.links.findIndex((item) => item.id === linkId)

    if (linkIndex >= 0) {
      this.links[linkIndex].urlOrigin = urlOrigin
    }
  }

  async findByShortLink(shortLink: string): Promise<Link | null> {
    const link = this.links.find((item) => item.urlHash === shortLink)

    if (!link) return null

    return link
  }

  async updateClicks(linkId: string): Promise<void> {
    const linkIndex = this.links.findIndex((item) => item.id === linkId)

    if (linkIndex >= 0) {
      this.links[linkIndex].clicks = this.links[linkIndex].clicks + 1
    }
  }
}
