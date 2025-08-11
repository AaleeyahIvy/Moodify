# Moodify
What are you in the mood for? Shuffling your 1000+ liked songs playlist and it's not hitting? Try to discover songs based on how you're feeling.
## 🖌️ Features

- 🎨 **Color/Mood Grid**: Click expressive color blocks like *Energetic Pink* or *Calm Blue* to kickstart music suggestions.
- 🔍 **Search Vibes**: Type custom moods like “neon sunset” or “rage pastel” to get curated tracks.
- 🧠 **LLM + Spotify Integration**: Prompts are mapped to audio features using a language model, then matched to Spotify’s recommendation API.
- 🪄 **Explainable Results**: Hover to see why each track fits—based on energy, valence, tempo, and mood tags.
- 🧍‍♂️ **User Profile Badge**: Access recent prompts, saved playlists, and playback settings.

---

## ⚙️ Tech Stack

### Frontend
- **React**, **TypeScript**, **Tailwind CSS**
- **TanStack Query** (for data fetching)
- **Zustand** (for selection state)

### Backend
- **Fastify** + **Prisma** + **PostgreSQL** (Neon/Supabase)
- **Spotify OAuth (PKCE)** and playback support
- **LLM-powered recs pipeline** (seed genres, targets, explainability)
- Optional: **Redis** for caching prompts and rec results

---

## 📦 Local Setup

### Prerequisites
- Node v20.19+ or v22.12+
- PostgreSQL or Supabase database
- Spotify Developer credentials

### Frontend
```bash
git clone https://github.com/yourname/moodify
cd moodify-frontend
npm install
npm run dev
