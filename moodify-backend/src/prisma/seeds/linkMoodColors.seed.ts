  import { PrismaClient } from "@prisma/client";
  
async function linkMoodColors(prisma: PrismaClient) {
  // Link Moods to Colors (weights subtly bias the merge)
  const colorWeights: Record<string, Array<{ colorSlug: string; weight: number }>> = {
    chill:     [{ colorSlug: 'ocean', weight: 0.7 }, { colorSlug: 'forest', weight: 0.5 }, { colorSlug: 'slate', weight: 0.4 }],
    energetic: [{ colorSlug: 'sunset', weight: 0.8 }, { colorSlug: 'gold', weight: 0.6 }, { colorSlug: 'rose', weight: 0.5 }],
    melancholic:[{ colorSlug: 'midnight', weight: 0.8 }, { colorSlug: 'slate', weight: 0.6 }, { colorSlug: 'lavender', weight: 0.4 }],
    focus:     [{ colorSlug: 'forest', weight: 0.7 }, { colorSlug: 'slate', weight: 0.6 }, { colorSlug: 'ocean', weight: 0.4 }],
    euphoric:  [{ colorSlug: 'gold', weight: 0.7 }, { colorSlug: 'sunset', weight: 0.6 }, { colorSlug: 'lavender', weight: 0.5 }],
  };

  for (const [moodSlug, entries] of Object.entries(colorWeights)) {
    const mood = await prisma.mood.findUnique({ where: { slug: moodSlug } });
    if (!mood) continue;
    for (const { colorSlug, weight } of entries) {
      const color = await prisma.color.findUnique({ where: { slug: colorSlug } });
      if (!color) continue;
      await prisma.moodColor.createMany({
        data: { moodId: mood.id, colorId: color.id, weight },
      });
    }
  }

  console.log('Seed completed');
}

export default linkMoodColors;