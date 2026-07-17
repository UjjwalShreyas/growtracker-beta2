// EmptyState — "nothing here yet" placeholder component.
// Props:
//   icon, title, description, actionLabel, onAction

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = "📦",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 px-6 text-center anim-fade-up">
      <span
        className="text-5xl select-none anim-pop-in"
        role="img"
        aria-label={title}
      >
        {icon}
      </span>
      <h3 className="font-bold text-gray-700 text-lg mt-1">{title}</h3>
      {description && (
        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary rounded-xl px-6 py-2.5 text-sm mt-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
