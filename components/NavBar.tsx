import Link from 'next/link';
import { Dumbbell, Flame } from 'lucide-react';
import { SignInButton } from './SignInButton';

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold tracking-tight">Geometry Gym</span>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            Beta
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-lg font-medium text-muted sm:flex">
          <a href="#workout" className="hover:text-dark transition-colors">
            Daily Workout
          </a>
          <a href="#topics" className="hover:text-dark transition-colors">
            Topics
          </a>
          <Link href="/library" className="hover:text-dark transition-colors">
            Library
          </Link>
          <Link href="/progress" className="hover:text-dark transition-colors">
            My Progress
          </Link>
          <Link href="/feedback" className="hover:text-dark transition-colors">
            Feedback
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SignInButton />
          <a
            href="#workout"
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Flame className="h-4 w-4" />
            Start Training
          </a>
        </div>
      </div>
    </nav>
  );
}
