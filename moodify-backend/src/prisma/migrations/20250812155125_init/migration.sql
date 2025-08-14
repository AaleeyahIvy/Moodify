-- CreateEnum
CREATE TYPE "public"."OAuthProvider" AS ENUM ('SPOTIFY');

-- CreateEnum
CREATE TYPE "public"."RecSource" AS ENUM ('PROMPT', 'SELECTION', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."RecStatus" AS ENUM ('QUEUED', 'RUNNING', 'COMPLETE', 'FAILED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "displayName" TEXT,
    "spotifyUserId" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OAuthToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "public"."OAuthProvider" NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "scope" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "targetHints" JSONB,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "audioTargets" JSONB NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MoodColor" (
    "id" TEXT NOT NULL,
    "moodId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MoodColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeedGenre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeedGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MoodGenre" (
    "id" TEXT NOT NULL,
    "moodId" TEXT NOT NULL,
    "seedGenreId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MoodGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecommendationRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "source" "public"."RecSource" NOT NULL,
    "prompt" TEXT,
    "selectedMoodId" TEXT,
    "selectedColorId" TEXT,
    "seedGenres" TEXT[],
    "targetFeatures" JSONB NOT NULL,
    "explanation" TEXT,
    "status" "public"."RecStatus" NOT NULL DEFAULT 'QUEUED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecommendationResult" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "tracksCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecommendationResultTrack" (
    "id" TEXT NOT NULL,
    "resultId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "spotifyTrackId" TEXT NOT NULL,

    CONSTRAINT "RecommendationResultTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Playlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spotifyPlaylistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrackCache" (
    "spotifyTrackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistNames" TEXT[],
    "albumName" TEXT,
    "imageUrl" TEXT,
    "previewUrl" TEXT,
    "durationMs" INTEGER,
    "audioFeatures" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackCache_pkey" PRIMARY KEY ("spotifyTrackId")
);

-- CreateTable
CREATE TABLE "public"."PromptCache" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "selectedMoodId" TEXT,
    "selectedColorId" TEXT,
    "seedGenres" TEXT[],
    "targetFeatures" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserStats" (
    "userId" TEXT NOT NULL,
    "discoveredTracksCount" INTEGER NOT NULL DEFAULT 0,
    "spotifyPlaylistCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."UserTrackDiscovery" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spotifyTrackId" TEXT NOT NULL,
    "requestId" TEXT,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interacted" BOOLEAN NOT NULL DEFAULT false,
    "addedToPlaylist" BOOLEAN NOT NULL DEFAULT false,
    "savedToLibrary" BOOLEAN NOT NULL DEFAULT false,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "lastInteractedAt" TIMESTAMP(3),

    CONSTRAINT "UserTrackDiscovery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserFavoriteGenre" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFavoriteGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyUserId_key" ON "public"."User"("spotifyUserId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_userId_provider_key" ON "public"."OAuthToken"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "public"."Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_slug_key" ON "public"."Color"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_name_key" ON "public"."Mood"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_slug_key" ON "public"."Mood"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MoodColor_moodId_colorId_key" ON "public"."MoodColor"("moodId", "colorId");

-- CreateIndex
CREATE UNIQUE INDEX "SeedGenre_slug_key" ON "public"."SeedGenre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MoodGenre_moodId_seedGenreId_key" ON "public"."MoodGenre"("moodId", "seedGenreId");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendationResult_requestId_key" ON "public"."RecommendationResult"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_spotifyPlaylistId_key" ON "public"."Playlist"("spotifyPlaylistId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_requestId_key" ON "public"."Playlist"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "PromptCache_hash_key" ON "public"."PromptCache"("hash");

-- CreateIndex
CREATE INDEX "UserTrackDiscovery_userId_interacted_idx" ON "public"."UserTrackDiscovery"("userId", "interacted");

-- CreateIndex
CREATE UNIQUE INDEX "UserTrackDiscovery_userId_spotifyTrackId_key" ON "public"."UserTrackDiscovery"("userId", "spotifyTrackId");

-- CreateIndex
CREATE INDEX "UserFavoriteGenre_userId_score_idx" ON "public"."UserFavoriteGenre"("userId", "score");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteGenre_userId_genre_source_key" ON "public"."UserFavoriteGenre"("userId", "genre", "source");

-- AddForeignKey
ALTER TABLE "public"."OAuthToken" ADD CONSTRAINT "OAuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MoodColor" ADD CONSTRAINT "MoodColor_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "public"."Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MoodColor" ADD CONSTRAINT "MoodColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MoodGenre" ADD CONSTRAINT "MoodGenre_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "public"."Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MoodGenre" ADD CONSTRAINT "MoodGenre_seedGenreId_fkey" FOREIGN KEY ("seedGenreId") REFERENCES "public"."SeedGenre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendationRequest" ADD CONSTRAINT "RecommendationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendationRequest" ADD CONSTRAINT "RecommendationRequest_selectedMoodId_fkey" FOREIGN KEY ("selectedMoodId") REFERENCES "public"."Mood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendationRequest" ADD CONSTRAINT "RecommendationRequest_selectedColorId_fkey" FOREIGN KEY ("selectedColorId") REFERENCES "public"."Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendationResult" ADD CONSTRAINT "RecommendationResult_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."RecommendationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendationResultTrack" ADD CONSTRAINT "RecommendationResultTrack_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "public"."RecommendationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Playlist" ADD CONSTRAINT "Playlist_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."RecommendationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PromptCache" ADD CONSTRAINT "PromptCache_selectedMoodId_fkey" FOREIGN KEY ("selectedMoodId") REFERENCES "public"."Mood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PromptCache" ADD CONSTRAINT "PromptCache_selectedColorId_fkey" FOREIGN KEY ("selectedColorId") REFERENCES "public"."Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTrackDiscovery" ADD CONSTRAINT "UserTrackDiscovery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserFavoriteGenre" ADD CONSTRAINT "UserFavoriteGenre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
