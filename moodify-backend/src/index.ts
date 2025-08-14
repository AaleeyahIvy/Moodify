import Fastify from 'fastify'
import dotenv from 'dotenv'
import { prisma } from './prisma/client.ts'
import { meRoutes } from './routes/me.ts'

dotenv.config()
console.log('Loaded PORT:', process.env.PORT)


const app = Fastify({ logger: true })

app.register(meRoutes)

app.listen({ port: process.env.PORT ? Number(process.env.PORT) : 3000 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server listening at ${address}`)
})
