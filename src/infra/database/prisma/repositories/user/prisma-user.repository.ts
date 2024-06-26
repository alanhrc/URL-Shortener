import { Injectable } from '@nestjs/common'

import { User } from '@/app/user/entities/user'
import { UserRepository } from '@/app/user/repositories/user.repository'

import { PrismaUserMapper } from '../../mappers/user/prisma-user.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prismaService.user.create({
      data: raw,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
