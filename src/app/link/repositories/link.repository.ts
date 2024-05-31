import { Link } from '../entities/link'

export abstract class LinkRepository {
  abstract create(link: Link): Promise<void>
  // abstract findByEmail(email: string): Promise<User | null>
}
