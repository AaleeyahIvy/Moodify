import { PrismaClient } from "@prisma/client";

async function seedColors(prisma: PrismaClient) {
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

  for (const color of colors) {
    await prisma.color.create({
      data: color,
    });
  }
}
export default seedColors;
