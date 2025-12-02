import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import streamsConfig from "@/config/streams.json";
import leagueOrder from "@/config/league_order.json";

export default function AdminPage() {
  const adminEmail = process.env.ADMIN_EMAIL || "benbalbazar@proton.me";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 text-sm">
        <header>
          <h1 className="text-lg font-semibold tracking-tight">Admin panel</h1>
          <p className="text-xs text-muted">
            Manage stream placeholders, league priority, and review basic analytics. Changes to
            config files currently require a redeploy.
          </p>
        </header>

        <section className="rounded-2xl border border-muted/40 bg-white/90 p-4">
          <h2 className="mb-2 text-sm font-semibold">Stream configuration (read-only stub)</h2>
          <p className="mb-3 text-xs text-muted">
            Streams are configured in <code className="rounded bg-background px-1 py-0.5 text-[11px]">config/streams.json</code>.
            Do not embed or redistribute any stream that you do not have rights to. For Turkish
            matches, default stream is{" "}
            <strong>beIN Sports Turkey (requires license)</strong>. Only paste official
            rights-holder embeds or secure HLS links.
          </p>
          <pre className="max-h-64 overflow-auto rounded-lg bg-background p-3 text-xs">
            {JSON.stringify(streamsConfig, null, 2)}
          </pre>
        </section>

        <section className="rounded-2xl border border-muted/40 bg-white/90 p-4">
          <h2 className="mb-2 text-sm font-semibold">League priority (read-only stub)</h2>
          <p className="mb-3 text-xs text-muted">
            League ordering for live matches is defined in{" "}
            <code className="rounded bg-background px-1 py-0.5 text-[11px]">config/league_order.json</code>.
          </p>
          <pre className="max-h-40 overflow-auto rounded-lg bg-background p-3 text-xs">
            {JSON.stringify(leagueOrder, null, 2)}
          </pre>
        </section>

        <section className="rounded-2xl border border-muted/40 bg-white/90 p-4">
          <h2 className="mb-2 text-sm font-semibold">Chat moderation (UI stub)</h2>
          <p className="mb-3 text-xs text-muted">
            Build tools here to mute users, delete messages, or pin official announcements. Tie this
            into your production chat backend.
          </p>
          <div className="grid gap-2 text-xs md:grid-cols-3">
            <button className="rounded-full border border-muted/60 px-3 py-2">
              View active rooms
            </button>
            <button className="rounded-full border border-muted/60 px-3 py-2">
              Mute user (stub)
            </button>
            <button className="rounded-full border border-muted/60 px-3 py-2">
              Clear room history (stub)
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-muted/40 bg-white/90 p-4">
          <h2 className="mb-2 text-sm font-semibold">Analytics (lightweight stub)</h2>
          <p className="mb-3 text-xs text-muted">
            Wire page views and match views to Postgres or an analytics provider. For Google
            Analytics, add your snippet in <code className="rounded bg-background px-1 py-0.5 text-[11px]">app/layout.tsx</code>.
          </p>
          <ul className="text-xs text-muted">
            <li>• Page views (in-memory): stubbed counter.</li>
            <li>• Match detail views: increment in match detail loader.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-muted/40 bg-white/90 p-4 text-xs">
          <h2 className="mb-2 text-sm font-semibold">Admin contact</h2>
          <p>
            Admin email: <a href={`mailto:${adminEmail}`}>{adminEmail}</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}





