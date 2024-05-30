import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { UnauthorizedException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new UnauthorizedException('Provider DATABASE_URL environment value.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  process.env.DATABASE_URL = generateUniqueDatabaseURL(schemaId)
  process.env.NODE_ENV = 'test'

  execSync(
    `DATABASE_URL=${generateUniqueDatabaseURL(schemaId)} npx prisma migrate deploy`,
  )
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)

  await prisma.$disconnect()
})
