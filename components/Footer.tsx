import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-muted/30 bg-background/90 text-xs sm:text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-2 leading-relaxed">
            <p>
              © 2025 <span className="font-semibold text-text-dark">BeyazElma</span> — Your live sports hub.
            </p>
            <p>
              Follow updates on{' '}
              <a
                href="https://t.me/forbalbasaur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Telegram: t.me/forbalbasaur
              </a>
              . For business & support:{' '}
              <a
                href="mailto:benbalbazar@proton.me"
                className="text-primary hover:underline font-medium"
              >
                benbalbazar@proton.me
              </a>
              .
            </p>
            <p className="text-[10px] sm:text-xs opacity-80">
              All streams & broadcasts are subject to rights and licensing. BeyazElma is not responsible for third-party streams — obtain proper rights before publishing.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2 text-xs">
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Us
            </Link>
            <Link href="/admin" className="text-muted hover:text-primary transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




