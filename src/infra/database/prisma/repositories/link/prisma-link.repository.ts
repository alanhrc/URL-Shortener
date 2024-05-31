import { Injectable } from '@nestjs/common'

import { Link } from '@/app/link/entities/link'
import { LinkRepository } from '@/app/link/repositories/link.repository'

import { PrismaLinkMapper } from '../../mappers/link/prisma-link.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaLinkRepository implements LinkRepository {
  constructor(private prismaService: PrismaService) {}

  async create(link: Link): Promise<void> {
    const raw = PrismaLinkMapper.toPrisma(link)

    await this.prismaService.link.create({
      data: raw,
    })
  }

  // async findByEmail(email: string): Promise<Link | null> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   })

  //   if (!user) {
  //     return null
  //   }

  //   return PrismaUserMapper.toDomain(user)
  // }
}
