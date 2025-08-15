import { PrismaClient } from "@prisma/client";

 async function seedGenres(prisma: PrismaClient) {
    // Spotify seed genres (subset you’ll actually use)
  const seedGenres = [
    'pop', 'dance', 'edm', 'house', 'techno', 'trance',
    'indie', 'alt-rock', 'rock', 'metal', 'punk',
    'hip-hop', 'r-n-b', 'soul', 'funk',
    'k-pop', 'j-pop', 'afrobeat', 'reggaeton', 'latin', 'salsa',
    'ambient', 'chill', 'classical', 'jazz', 'blues', 'acoustic',
    'electropop', 'synth-pop', 'lo-fi', 'study', 'work-out',
  ];

  for (const genre of seedGenres) {
    await prisma.seedGenre.createMany({
      data: { name: genre.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()), slug: genre },
    });
  }
}

export default seedGenres;