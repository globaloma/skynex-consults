export function MobileRecordCard({
  title,
  badge,
  children,
  actions,
}: {
  title: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-text-primary">{title}</p>
        {badge}
      </div>

      {children ? <div className="mt-3 space-y-1.5">{children}</div> : null}

      {actions ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-borderSoft pt-3">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export function MobileRecordRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="shrink-0 text-text-muted">{label}</span>
      <span className="text-right text-text-body">{value}</span>
    </div>
  );
}
