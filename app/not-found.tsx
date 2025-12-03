import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-text-dark mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-dark mb-4">Page Not Found</h2>
          <p className="text-muted mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

