export function HelixMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M9 5c7.5 0 7.5 22 15 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 5c-7.5 0-7.5 22-15 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="16" r="2.15" fill="currentColor" />
    </svg>
  );
}
