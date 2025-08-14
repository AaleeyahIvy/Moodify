import { PrismaClient } from '@prisma/client'

async function linkMoodGenres(prisma: PrismaClient) {
  const moodGenreWeights: Record<string, Array<{ slug: string; weight: number }>> = {
    energetic: [
      { slug: 'edm', weight: 0.8 }, { slug: 'dance', weight: 0.7 }, { slug: 'pop', weight: 0.6 }, { slug: 'house', weight: 0.5 },
    ],
    chill: [
      { slug: 'chill', weight: 0.8 }, { slug: 'ambient', weight: 0.6 }, { slug: 'lo-fi', weight: 0.6 }, { slug: 'acoustic', weight: 0.5 },
    ],
    melancholic: [
      { slug: 'indie', weight: 0.6 }, { slug: 'alt-rock', weight: 0.5 }, { slug: 'jazz', weight: 0.4 }, { slug: 'blues', weight: 0.4 },
    ],
    focus: [
      { slug: 'lo-fi', weight: 0.8 }, { slug: 'ambient', weight: 0.7 }, { slug: 'classical', weight: 0.6 }, { slug: 'study', weight: 0.6 },
    ],
    euphoric: [
      { slug: 'trance', weight: 0.8 }, { slug: 'edm', weight: 0.7 }, { slug: 'synth-pop', weight: 0.5 },
    ],
  }

  for (const [moodSlug, genreWeights] of Object.entries(moodGenreWeights)) {
    const mood = await prisma.mood.findUnique({ where: { slug: moodSlug } })
    if (!mood) continue

    for (const { slug, weight } of genreWeights) {
      const genre = await prisma.seedGenre.findUnique({ where: { slug } })
      if (!genre) continue

      await prisma.moodGenre.create({
        data: {
          mood: { connect: { id: mood.id } },
          seedGenre: { connect: { id: genre.id } },
          weight,
        },
      })
    }
  }
  console.log('Seed completed');
}

export default linkMoodGenres;
