import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 space-y-4">
      <Skeleton className="aspect-video w-full rounded-lg shimmer-bg" />
      <Skeleton className="h-6 w-3/4 shimmer-bg" />
      <Skeleton className="h-4 w-full shimmer-bg" />
      <Skeleton className="h-4 w-5/6 shimmer-bg" />
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded-full shimmer-bg" />
        <Skeleton className="h-6 w-24 rounded-full shimmer-bg" />
        <Skeleton className="h-6 w-16 rounded-full shimmer-bg" />
      </div>
    </div>
  );
}
