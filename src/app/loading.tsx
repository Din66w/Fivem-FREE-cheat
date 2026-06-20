export default function Loading() {
  return (
    <div className="nox-container py-16 lg:py-24">
      <div className="nox-skeleton mb-12 h-12 w-64" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="nox-skeleton aspect-[3/4]" />
            <div className="nox-skeleton mt-4 h-4 w-2/3" />
            <div className="nox-skeleton mt-2 h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
