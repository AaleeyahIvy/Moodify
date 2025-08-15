import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const moodWithColors = await prisma.mood.findUnique({
  where: { slug: 'chill' },
  include: {
    colors: true,
  }
})

console.log(moodWithColors)