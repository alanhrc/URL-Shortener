import { User } from '@/app/user/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
    }
  }
}
