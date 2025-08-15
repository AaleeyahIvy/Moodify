import { FastifyInstance } from "fastify";
import Fastify from 'fastify'
import fp from "fastify-plugin";
import { prisma } from "../prisma/client";

const fastify = Fastify({
  logger: true
});

export const meRoutes = fp(async(fastify: FastifyInstance) => {
  fastify.get('/me', async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: {email: 'samanthastar87@gmail.com'},
      include: {playlists: true},
    })

    if(!user) return reply.status(404).send({error: 'User not found'})

    return reply.send(user)
  })
  fastify.get('/test-moods', async () => {
    return prisma.mood.findMany({
      include: {
        colors: { include: { color: true } },
        genres: { include: { seedGenre: true } }
      }
    })
  })
  // test route
fastify.get('/debug/moods', async () => {
  return prisma.mood.findMany()
})

})