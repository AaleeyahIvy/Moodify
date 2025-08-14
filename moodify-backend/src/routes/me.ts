import { FastifyInstance } from "fastify";
import Fastify from 'fastify'
import fp from "fastify-plugin";
import { prisma } from "../prisma/client.ts";

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
})