"use client";

import { TeamLogo } from "./TeamLogo";

interface TeamLogoClientProps {
  src?: string;
  alt: string;
  fallbackText: string;
  className?: string;
}

export function TeamLogoClient(props: TeamLogoClientProps) {
  return <TeamLogo {...props} />;
}

