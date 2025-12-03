"use client";

import { useState } from "react";

interface TeamLogoProps {
  src?: string;
  alt: string;
  fallbackText: string;
  className?: string;
}

export function TeamLogo({ src, alt, fallbackText, className = "" }: TeamLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <span className="text-sm font-bold text-muted">
        {fallbackText.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

