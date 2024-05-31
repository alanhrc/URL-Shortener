import { Link } from '@/app/link/entities/link'
import { LinkRepository } from '@/app/link/repositories/link.repository'

export class InMemoryLinkRepository implements LinkRepository {
  public links: Link[] = []

  async create(link: Link) {
    this.links.push(link)
  }

  // async findByEmail(email: string): Promise<User | null> {
  //   const user = this.users.find((item) => item.email === email)

  //   if (!user) {
  //     return null
  //   } else {
  //     return user
  //   }
  // }
}
