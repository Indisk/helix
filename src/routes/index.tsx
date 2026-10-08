import { createFileRoute } from "@tanstack/react-router";
import { StudioApp } from "@/components/studio/Studio";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <StudioApp />;
}
