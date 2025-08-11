import { UserProfile } from "./components/UserProfile"
export default function App () {
  return (
      <div className="min-h-screen bg-background">
      {/* Header with User Profile */}
        <header className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              moodify
            </h1>
            <p className="text-muted-foreground">Discover music through colors and moods</p>
          </div>
          <UserProfile />
        </header>
      </div>
  )
}