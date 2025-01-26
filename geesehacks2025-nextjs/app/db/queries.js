"use server"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserById(requestedId) {
  // ... you will write your Prisma Client queries here
  return await prisma.users.findUnique({
    where: {
        id: requestedId
    }
  })
}
