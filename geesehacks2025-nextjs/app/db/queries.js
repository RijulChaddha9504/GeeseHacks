"use server"

import { auth } from '@/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getSession(){
    return await auth();
}

export async function getUserById(requestedId) {
  // ... you will write your Prisma Client queries here
  return await prisma.users.findUnique({
    where: {
        id: requestedId
    }
  })
}
