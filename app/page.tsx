import { Layers, Triangle, Ruler, Box, MapPin, ArrowRight, Flame, ChevronRight, Zap, Dumbbell } from "lucide-react";
import Link from "next/link";
import { ContinueWorkoutBanner } from "@/components/ContinueWorkoutBanner";
import { NavBar } from "@/components/NavBar";

const muscleGroups = [
  {
    icon: Layers,
    title: "Foundations",
    description: "Points, lines, rays, planes, and angles — the building blocks of all geometry.",
    href: "/workout/foundations",
    available: true,
  },
  {
    icon: Triangle,
    title: "Shape & Form",
    description: "Polygons, triangles, symmetry — recognise, classify, and reason about shapes.",
    href: "/workout/shape-form",
    available: true,
  },
  {
    icon: Ruler,
    title: "The Measurement Room",
    description: "Area and perimeter — how much space a shape holds and how far it is around the edge.",
    href: "/workout/measurement",
    available: true,
  },
  {
    icon: Box,
    title: "Heavy Lifts",
    description: "Volume and surface area — 3D shapes, the space they hold, and the surface that wraps them.",
    href: "/workout/volume",
    available: true,
  },
  {
    icon: MapPin,
    title: "The Track",
    description: "Coordinates and transformations — plotting points, sliding, flipping, and rotating shapes.",
    href: "/workout/coordinates",
    available: true,
  },
  {
    icon: Zap,
    title: "Power Movement",
    description: "Pythagorean theorem, congruence, and similarity — the heavy-hitting theorems of geometry.",
    href: "/workout/power",
    available: true,
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

const bgShapes = [
  { type: 'circle',   top: '2%',  left: '1%',  size: 260, rotate:   0 },
  { type: 'triangle', top: '1%',  left: '72%', size: 220, rotate:  15 },
  { type: 'rect',     top: '12%', left: '85%', size: 240, rotate: -12 },
  { type: 'hexagon',  top: '16%', left: '-2%', size: 200, rotate:   8 },
  { type: 'diamond',  top: '22%', left: '58%', size: 220, rotate:   0 },
  { type: 'pentagon', top: '30%', left: '6%',  size: 250, rotate:  -5 },
  { type: 'circle',   top: '28%', left: '79%', size: 180, rotate:   0 },
  { type: 'triangle', top: '38%', left: '38%', size: 230, rotate: -20 },
  { type: 'rect',     top: '42%', left: '-1%', size: 200, rotate:  10 },
  { type: 'hexagon',  top: '47%', left: '72%', size: 220, rotate:  -8 },
  { type: 'diamond',  top: '54%', left: '17%', size: 190, rotate:  12 },
  { type: 'circle',   top: '58%', left: '84%', size: 250, rotate:   0 },
  { type: 'pentagon', top: '63%', left: '3%',  size: 210, rotate: -15 },
  { type: 'triangle', top: '67%', left: '52%', size: 220, rotate:   8 },
  { type: 'rect',     top: '73%', left: '77%', size: 190, rotate:  -6 },
  { type: 'hexagon',  top: '76%', left: '27%', size: 240, rotate:   5 },
  { type: 'circle',   top: '82%', left: '63%', size: 180, rotate:   0 },
  { type: 'diamond',  top: '86%', left: '2%',  size: 220, rotate: -10 },
  { type: 'triangle', top: '91%', left: '86%', size: 200, rotate:  18 },
  { type: 'pentagon', top: '93%', left: '44%', size: 190, rotate:  -7 },
];

export default function Home() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-white text-dark font-sans">

      {/* Decorative geometry shape watermark */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {bgShapes.map(({ type, top, left, size, rotate }) => (
          <svg
            key={`${type}-${top}-${left}`}
            className="absolute"
            style={{ top, left, width: size, height: size, transform: `rotate(${rotate}deg)` }}
            viewBox="0 0 100 100"
            fill="none"
            stroke="#efefef"
            strokeWidth={2}
            strokeLinejoin="round"
          >
            {type === 'circle' && (
              <>
                <circle cx="50" cy="50" r="44" />
                <ellipse cx="50" cy="50" rx="44" ry="15" strokeDasharray="5 3" />
                <ellipse cx="50" cy="50" rx="15" ry="44" strokeDasharray="5 3" />
              </>
            )}
            {type === 'rect' && (
              <>
                {/* front face */}
                <rect x="4" y="18" width="76" height="76" />
                {/* top face */}
                <polygon points="4,18 16,6 92,6 80,18" />
                {/* right face */}
                <polygon points="80,18 92,6 92,82 80,94" />
              </>
            )}
            {type === 'triangle' && (
              <>
                {/* cone: apex, base ellipse, two side lines */}
                <ellipse cx="50" cy="84" rx="40" ry="12" />
                <line x1="50" y1="6" x2="10" y2="84" />
                <line x1="50" y1="6" x2="90" y2="84" />
                <ellipse cx="50" cy="84" rx="40" ry="12" strokeDasharray="5 3" stroke="#efefef" />
              </>
            )}
            {type === 'pentagon' && (
              <>
                {/* front face */}
                <polygon points="50,8 90,36 74,86 26,86 10,36" />
                {/* back face offset (+9,-7) */}
                <polygon points="59,1 99,29 83,79 35,79 19,29" strokeDasharray="5 3" />
                {/* connecting edges (left visible) */}
                <line x1="50" y1="8" x2="59" y2="1" />
                <line x1="10" y1="36" x2="19" y2="29" />
                <line x1="90" y1="36" x2="99" y2="29" />
              </>
            )}
            {type === 'hexagon' && (
              <>
                {/* front face */}
                <polygon points="50,6 84,25 84,72 50,91 16,72 16,25" />
                {/* back face offset (+9,-7) */}
                <polygon points="59,-1 93,18 93,65 59,84 25,65 25,18" strokeDasharray="5 3" />
                {/* connecting edges */}
                <line x1="50" y1="6"  x2="59" y2="-1" />
                <line x1="84" y1="25" x2="93" y2="18" />
                <line x1="84" y1="72" x2="93" y2="65" />
              </>
            )}
            {type === 'diamond' && (
              <>
                {/* faceted gem: top pyramid + bottom pyramid + girdle */}
                {/* girdle (widest ring) */}
                <polygon points="50,42 92,50 50,58 8,50" />
                {/* top facets */}
                <line x1="50" y1="5"  x2="92" y2="50" />
                <line x1="50" y1="5"  x2="50" y2="42" />
                <line x1="50" y1="5"  x2="8"  y2="50" />
                <line x1="50" y1="42" x2="92" y2="50" />
                <line x1="50" y1="42" x2="8"  y2="50" />
                {/* bottom point */}
                <line x1="92" y1="50" x2="50" y2="95" />
                <line x1="8"  y1="50" x2="50" y2="95" />
                <line x1="50" y1="58" x2="50" y2="95" />
              </>
            )}
          </svg>
        ))}
      </div>

      {/* Nav */}
      <NavBar />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
          <Flame className="h-3 w-3 text-primary" />
          Daily geometry training
        </div>
        <p className="text-3xl font-bold text-primary tracking-wide">
          Building stronger brains one math rep at a time.
        </p>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-dark sm:text-6xl lg:text-7xl">
          Train Your{" "}
          <span className="text-primary">Brain</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Math is a skill — and like any skill, it gets stronger with practice.
          Geometry Gym gives you daily workouts that build real understanding,
          one problem at a time. No pressure. Just reps.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/workout/foundations?mode=daily"
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Today&apos;s Workout
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#topics"
            className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-dark transition-colors hover:bg-surface"
          >
            Browse Topics
          </a>
        </div>
      </section>

      {/* Resume banner — only visible when there's an active session */}
      <ContinueWorkoutBanner />

      {/* Today's Workout Card */}
      <section id="workout" className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
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
              <Link
                href="/workout/foundations?mode=daily"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Start Workout
                <ChevronRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-muted">Resets every day at midnight</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 bg-gradient-to-b from-white via-orange-50 to-white py-20">
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

      {/* Muscle Groups / Topics */}
      <section id="topics" className="relative z-10 py-20">
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
              const topicSlug = group.href.split('/').pop();
              return (
                <div
                  key={group.title}
                  className={`flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 transition-all ${
                    group.available
                      ? 'hover:border-primary/40 hover:shadow-md'
                      : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark">{group.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{group.description}</p>
                  </div>
                  {group.available && (
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <Link
                        href={`${group.href}?mode=practice`}
                        className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        Start training <ChevronRight className="h-3 w-3" />
                      </Link>
                      <Link
                        href={`/library?topic=${topicSlug}`}
                        className="text-xs text-muted hover:text-primary transition-colors"
                      >
                        Study first →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-dark">
            <Dumbbell className="h-4 w-4 text-primary" />
            Geometry Gym
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Beta</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
