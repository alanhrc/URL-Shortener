import { User } from '@/app/user/entities/user'
import { UserRepository } from '@/app/user/repositories/user.repository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: User) {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    } else {
      return user
    }
  }
}
