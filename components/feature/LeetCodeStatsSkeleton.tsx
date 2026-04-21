export function LeetCodeStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 animate-pulse">
      <div>
        <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-2">
          <div className="h-3 w-16 bg-[color:var(--color-rule)]" />
          <div className="h-6 w-14 bg-[color:var(--color-rule)]" />
        </div>
        <div className="mt-6 space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-12 bg-[color:var(--color-rule)]" />
                <div className="h-3 w-8 bg-[color:var(--color-rule)]" />
              </div>
              <div className="h-px w-full bg-[color:var(--color-rule)]" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-3 w-20 bg-[color:var(--color-rule)]" />
        <div className="mt-4 h-10 w-40 bg-[color:var(--color-rule)]" />
      </div>
    </div>
  );
}
