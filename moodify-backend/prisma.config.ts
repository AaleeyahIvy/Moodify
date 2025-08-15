import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    seed: `tsx src/prisma/seeds/seed.ts`,
  },
});
