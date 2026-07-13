import Link from 'next/link';
import { Dumbbell, Flame } from 'lucide-react';
import { SignInButton } from './SignInButton';

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 text-dark backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-dark sm:text-2xl">Geometry Gym</span>
          <span className="hidden text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full sm:inline-flex">
            Beta
          </span>
        </Link>
        <div className="order-last flex w-full items-center gap-4 overflow-x-auto whitespace-nowrap text-sm font-semibold text-muted md:order-none md:w-auto md:overflow-visible lg:gap-6 lg:text-base lg:font-medium xl:gap-8">
          <Link href="/#workout" className="hover:text-dark transition-colors">
            Daily Workout
          </Link>
          <Link href="/#topics" className="hover:text-dark transition-colors">
            Topics
          </Link>
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
          <Link
            href="/#workout"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark xl:flex"
          >
            <Flame className="h-4 w-4" />
            Start Training
          </Link>
        </div>
      </div>
    </nav>
  );
}
