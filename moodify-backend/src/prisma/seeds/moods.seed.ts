import { PrismaClient } from "@prisma/client";

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

async function seedMoods(prisma: PrismaClient) {
  const moods: Array<{
    name: string;
    slug: string;
    description?: string;
    audioTargets: Target;
  }> = [
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
      name: 'Happy',
      slug: 'happy',
      description: 'Bright and uplifting tunes.',
      audioTargets: { valence: 0.8, energy: 0.7, danceability: 0.65, acousticness: 0.2, tempo: { min: 100, max: 130 } },
    },
    {
      name: 'Sad',
      slug: 'sad',
      description: 'Reflective and somber tracks.',
      audioTargets: { valence: 0.2, energy: 0.3, danceability: 0.3, acousticness: 0.6, tempo: { min: 60, max: 90 } },
    },
    {
      name: 'Romantic',
      slug: 'romantic',
      description:
        'Soft and intimate melodies perfect for a romantic setting.',
      audioTargets:
        { valence: 0.7, energy: 0.4, danceability: 0.5, acousticness: 0.7, tempo:{ min: 70, max: 100 } },
    },
    {
      name: 'Dramatic',
      slug: 'dramatic',
      description: 'Intense and powerful tracks.',
      audioTargets: { valence: 0.6, energy: 0.8, danceability: 0.4, acousticness: 0.3, tempo: { min: 90, max: 130 } },
    },
    {
      name: 'Euphoric',
      slug: 'euphoric',
      description: 'Uplifting and feel-good tracks.',
      audioTargets: { valence: 0.9, energy: 0.8, danceability: 0.7, acousticness: 0.2, tempo: { min: 120, max: 150 } },
    },
  ];

  for (const mood of moods) {
    await prisma.mood.createMany({
      data: mood,
    });
  }
}

export default seedMoods;