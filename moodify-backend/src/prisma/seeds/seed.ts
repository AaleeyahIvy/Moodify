import { PrismaClient } from '@prisma/client';
import seedColors from './colors.seed';
import seedMoods  from './moods.seed';
import seedGenres from './genres.seed';
import linkMoodColors from './linkMoodColors.seed';
import linkMoodGenres from './linkMoodGenres.seed';

const prisma = new PrismaClient();
export default async function main() {
  await seedColors(prisma);
  await seedMoods(prisma);
  await seedGenres(prisma);
  await linkMoodColors(prisma);
  await linkMoodGenres(prisma);
  
  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
