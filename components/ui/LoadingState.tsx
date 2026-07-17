// LoadingState — spinner + message. Uses the .spinner CSS class from globals.css.

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading…" }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 px-4 text-center anim-fade-in">
      <div className="spinner" />
      <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>{message}</p>
    </div>
  );
}
