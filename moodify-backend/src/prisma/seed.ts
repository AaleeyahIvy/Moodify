// prisma/seed.ts
import { PrismaClient, RecSource } from '@prisma/client';
const prisma = new PrismaClient();

type Target = {
  valence?: number;
  energy?: number;
  danceability?: number;
  acousticness?: number;
  instrumentalness?: number;
  speechiness?: number;
  liveness?: number;
  tempo?: { min?: number; max?: number; target?: number };
};

async function main() {
  // Colors
  const colors = [
    { name: 'Sunset', slug: 'sunset', hex: '#F97316', targetHints: { valence: 0.8, energy: 0.7 } },
    { name: 'Ocean', slug: 'ocean', hex: '#0EA5E9', targetHints: { valence: 0.5, energy: 0.5, danceability: 0.6 } },
    { name: 'Forest', slug: 'forest', hex: '#10B981', targetHints: { acousticness: 0.6, instrumentalness: 0.2 } },
    { name: 'Midnight', slug: 'midnight', hex: '#111827', targetHints: { valence: 0.3, energy: 0.4 } },
    { name: 'Rose', slug: 'rose', hex: '#F43F5E', targetHints: { valence: 0.7, danceability: 0.7 } },
    { name: 'Lavender', slug: 'lavender', hex: '#A78BFA', targetHints: { valence: 0.6, energy: 0.5 } },
    { name: 'Gold', slug: 'gold', hex: '#F59E0B', targetHints: { valence: 0.85, energy: 0.65 } },
    { name: 'Slate', slug: 'slate', hex: '#64748B', targetHints: { valence: 0.45, energy: 0.45 } },
  ];

  // Moods
  const moods: Array<{ name: string; slug: string; description?: string; audioTargets: Target }> = [
    {
      name: 'Chill',
      slug: 'chill',
      description: 'Warm, laid-back, and unobtrusive.',
      audioTargets: { valence: 0.55, energy: 0.35, danceability: 0.55, acousticness: 0.5, tempo: { min: 80, max: 110 } },
    },
    {
      name: 'Energetic',
      slug: 'energetic',
      description: 'High-energy, feel-good songs.',
      audioTargets: { valence: 0.75, energy: 0.8, danceability: 0.75, acousticness: 0.15, tempo: { min: 110, max: 140 } },
    },
    {
      name: 'Melancholic',
      slug: 'melancholic',
      description: 'Tender, introspective, and emotional.',
      audioTargets: { valence: 0.25, energy: 0.35, danceability: 0.4, acousticness: 0.55, tempo: { min: 70, max: 100 } },
    },
    {
      name: 'Focus',
      slug: 'focus',
      description: 'Steady, minimal vocals, low distraction.',
      audioTargets: { valence: 0.45, energy: 0.35, danceability: 0.5, acousticness: 0.6, instrumentalness: 0.6, tempo: { target: 90 } },
    },
    {
      name: 'Euphoric',
      slug: 'euphoric',
      description: 'Peak feeling, widescreen melodies.',
      audioTargets: { valence: 0.85, energy: 0.85, danceability: 0.7, acousticness: 0.1, liveness: 0.2, tempo: { min: 120, max: 138 } },
    },
  ];

  // Spotify seed genres (subset you’ll actually use)
  const seedGenres = [
    'pop', 'dance', 'edm', 'house', 'techno', 'trance',
    'indie', 'alt-rock', 'rock', 'metal', 'punk',
    'hip-hop', 'r-n-b', 'soul', 'funk',
    'k-pop', 'j-pop', 'afrobeat', 'reggaeton', 'latin', 'salsa',
    'ambient', 'chill', 'classical', 'jazz', 'blues', 'acoustic',
    'electropop', 'synth-pop', 'lo-fi', 'study', 'work-out',
  ];

  // Upsert Colors
  for (const c of colors) {
    await prisma.color.upsert({
      where: { slug: c.slug },
      update: { hex: c.hex, targetHints: c.targetHints },
      create: { name: c.name, slug: c.slug, hex: c.hex, targetHints: c.targetHints },
    });
  }

  // Upsert Moods
  for (const m of moods) {
    await prisma.mood.upsert({
      where: { slug: m.slug },
      update: { description: m.description, audioTargets: m.audioTargets as any },
      create: {
        name: m.name,
        slug: m.slug,
        description: m.description,
        audioTargets: m.audioTargets as any,
      },
    });
  }

  // Upsert Seed Genres
  for (const g of seedGenres) {
    await prisma.seedGenre.upsert({
      where: { slug: g },
      update: {},
      create: { name: g.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()), slug: g },
    });
  }

  // Link Moods to Seed Genres with weights
  const moodGenreWeights: Record<string, Array<{ slug: string; weight: number }>> = {
    energetic: [
      { slug: 'edm', weight: 0.8 }, { slug: 'dance', weight: 0.7 }, { slug: 'pop', weight: 0.6 }, { slug: 'house', weight: 0.5 }
    ],
    chill: [
      { slug: 'chill', weight: 0.8 }, { slug: 'ambient', weight: 0.6 }, { slug: 'lo-fi', weight: 0.6 }, { slug: 'acoustic', weight: 0.5 }
    ],
    melancholic: [
      { slug: 'indie', weight: 0.6 }, { slug: 'alt-rock', weight: 0.5 }, { slug: 'jazz', weight: 0.4 }, { slug: 'blues', weight: 0.4 }
    ],
    focus: [
      { slug: 'lo-fi', weight: 0.8 }, { slug: 'ambient', weight: 0.7 }, { slug: 'classical', weight: 0.6 }, { slug: 'study', weight: 0.6 }
    ],
    euphoric: [
      { slug: 'trance', weight: 0.8 }, { slug: 'edm', weight: 0.7 }, { slug: 'synth-pop', weight: 0.5 }
    ],
  };

  for (const [moodSlug, genreWeights] of Object.entries(moodGenreWeights)) {
    const mood = await prisma.mood.findUnique({ where: { slug: moodSlug } });
    if (!mood) continue;
    for (const { slug, weight } of genreWeights) {
      const genre = await prisma.seedGenre.findUnique({ where: { slug } });
      if (!genre) continue;
      await prisma.moodGenre.upsert({
        where: { moodId_seedGenreId: { moodId: mood.id, seedGenreId: genre.id } },
        update: { weight },
        create: { moodId: mood.id, seedGenreId: genre.id, weight },
      });
    }
  }

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
      await prisma.moodColor.upsert({
        where: { moodId_colorId: { moodId: mood.id, colorId: color.id } },
        update: { weight },
        create: { moodId: mood.id, colorId: color.id, weight },
      });
    }
  }

  console.log('Seed completed');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
