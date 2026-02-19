import { Dumbbell, Triangle, Compass, Square, Box, MapPin, ArrowRight, Flame, ChevronRight } from "lucide-react";

const muscleGroups = [
  {
    icon: Triangle,
    title: "Shapes & Polygons",
    description: "Triangles, quadrilaterals, circles, and everything in between.",
    reps: "24 reps",
  },
  {
    icon: Compass,
    title: "Angles",
    description: "Types of angles, angle relationships, and how to measure them.",
    reps: "18 reps",
  },
  {
    icon: Square,
    title: "Area & Perimeter",
    description: "How much space a shape takes up and how far it is around the edge.",
    reps: "30 reps",
  },
  {
    icon: Box,
    title: "Volume & Surface Area",
    description: "3D shapes, the space they hold, and the surface that wraps them.",
    reps: "20 reps",
  },
  {
    icon: MapPin,
    title: "The Coordinate Plane",
    description: "Plotting points, reading graphs, and understanding position in space.",
    reps: "16 reps",
  },
  {
    icon: Dumbbell,
    title: "The Pythagorean Theorem",
    description: "The relationship between the sides of a right triangle. Classic and powerful.",
    reps: "12 reps",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick Your Workout",
    description: "Jump into today's daily workout or choose a specific topic you want to train.",
  },
  {
    number: "02",
    title: "Do Your Reps",
    description: "Work through geometry problems one at a time. Read, think, answer. No rushing.",
  },
  {
    number: "03",
    title: "Track Your Gains",
    description: "See how your understanding grows over time. Every rep makes you stronger.",
  },
];

export default function Home() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Geometry Gym</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
            <a href="#workout" className="hover:text-dark transition-colors">Daily Workout</a>
            <a href="#topics" className="hover:text-dark transition-colors">Topics</a>
            <a href="#how-it-works" className="hover:text-dark transition-colors">How It Works</a>
          </div>
          <a
            href="#workout"
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Flame className="h-4 w-4" />
            Start Training
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
          <Flame className="h-3 w-3 text-primary" />
          Daily geometry training
        </div>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-dark sm:text-6xl lg:text-7xl">
          Train Your{" "}
          <span className="text-primary">Geometry</span>{" "}
          Brain
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Math is a skill — and like any skill, it gets stronger with practice.
          Geometry Gym gives you daily workouts that build real understanding,
          one problem at a time. No pressure. Just reps.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#workout"
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Today&apos;s Workout
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#topics"
            className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-dark transition-colors hover:bg-surface"
          >
            Browse Topics
          </a>
        </div>
      </section>

      {/* Today's Workout Card */}
      <section id="workout" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border bg-white px-8 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{today}</p>
              <h2 className="mt-1 text-xl font-bold text-dark">Today&apos;s Workout</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Flame className="h-4 w-4" />
              Daily Rep
            </div>
          </div>
          <div className="grid gap-0 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">Topic</p>
              <p className="mt-1 text-2xl font-bold text-dark">Area of Triangles</p>
              <p className="mt-2 text-sm text-muted">Base × height ÷ 2. Simple formula, big idea.</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">Workout</p>
              <p className="mt-1 text-2xl font-bold text-dark">10 Reps</p>
              <p className="mt-2 text-sm text-muted">Multiple choice · ~5 minutes</p>
            </div>
            <div className="flex flex-col justify-center px-8 py-6">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Start Workout
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-muted">Resets every day at midnight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Muscle Groups / Topics */}
      <section id="topics" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">The Training Floor</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
              Pick a Muscle Group
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted">
              Each topic is a different part of your geometry toolkit.
              Work through them all or focus on what you need most.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {muscleGroups.map((group) => {
              const Icon = group.icon;
              return (
                <button
                  key={group.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 text-left transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted">{group.reps}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {group.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Start training <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">The Plan</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <div className="text-5xl font-extrabold text-primary/20 leading-none">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-dark">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-dark">
            <Dumbbell className="h-4 w-4 text-primary" />
            Geometry Gym
          </div>
          <p className="text-xs text-muted">
            Building stronger math brains, one rep at a time.
          </p>
        </div>
      </footer>

    </div>
  );
}
