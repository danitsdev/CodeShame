import Link from "next/link";
import { Suspense } from "react";
import { LeaderboardCard } from "@/components/leaderboard-card";
import { Button } from "@/components/ui/button";
import { caller, HydrateClient, trpc } from "@/trpc/server";
import { LeaderboardStats } from "./leaderboard-stats";

async function LeaderboardList() {
  const entries = await caller.roast.getLeaderboard({ limit: 100 });

  return (
    <section className="flex flex-col w-full border border-border-primary/20 rounded-md overflow-hidden bg-bg-surface">
      {entries.map((entry) => (
        <LeaderboardCard key={entry.id} entry={entry} />
      ))}
    </section>
  );
}

function LeaderboardSkeleton() {
  return (
    <section className="flex flex-col w-full border border-border-primary/20 rounded-md overflow-hidden bg-bg-surface animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          key={i}
          className="h-[68px] border-b border-border-primary/10 bg-bg-elevated/50"
        />
      ))}
    </section>
  );
}

export default async function Leaderboard() {
  void trpc.roast.getStats.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center py-10 px-20 bg-bg-page text-text-primary">
        <div className="flex flex-col w-full max-w-[960px] gap-10 z-10 relative">
          {/* Hero Section */}
          <section className="flex flex-col gap-4">
            <header className="flex flex-col gap-3">
              <h1 className="flex items-center gap-3 font-mono text-4xl font-bold tracking-tight">
                <span className="text-accent-green">&gt;</span>
                <span className="text-text-primary">shame_leaderboard</span>
              </h1>
              <p className="text-text-secondary font-mono text-sm opacity-80">
                {"// the most shamed code on the internet"}
              </p>
            </header>

            <LeaderboardStats />
          </section>

          <Suspense fallback={<LeaderboardSkeleton />}>
            <LeaderboardList />
          </Suspense>

          {/* Home button */}
          <div className="flex justify-center pt-4">
            <Link href="/">
              <Button variant="secondary" className="font-mono text-xs">
                &lt;&lt; back_home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
