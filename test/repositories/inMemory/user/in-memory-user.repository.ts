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

  // async findById(notificationId: string): Promise<Notification | null> {
  //   const notification = this.notifications.find(
  //     (item) => item.id === notificationId,
  //   )

  //   if (!notification) {
  //     return null
  //   } else {
  //     return notification
  //   }
  // }

  // async save(notification: Notification): Promise<void> {
  //   const notificationIndex = this.notifications.findIndex(
  //     (item) => item.id === notification.id,
  //   )

  //   if (notificationIndex >= 0) {
  //     this.notifications[notificationIndex] = notification
  //   }
  // }

  // async countManyByRecipientId(recipientId: string): Promise<number> {
  //   const notifications = this.notifications.filter(
  //     (item) => item.recipientId === recipientId,
  //   )

  //   return notifications.length
  // }

  // async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
  //   const notifications = this.notifications.filter(
  //     (item) => item.recipientId === recipientId,
  //   )

  //   return notifications
  // }
}
