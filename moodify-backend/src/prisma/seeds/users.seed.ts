import { PrismaClient } from "@prisma/client";

async function seedUsers(prisma: PrismaClient) {
  const users = [
    {
      email: "user1@gmail.com",
      displayName: "User One",
    },
    {
      email: "user2@gmail.com",
      displayName: "User Two",
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log("Users seeded successfully");
} 