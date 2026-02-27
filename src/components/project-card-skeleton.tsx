import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
      <Skeleton className="aspect-[3/2] w-full shimmer-bg" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 shimmer-bg mb-3" />
        <Skeleton className="h-4 w-full shimmer-bg mb-2" />
        <Skeleton className="h-4 w-5/6 shimmer-bg mb-4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full shimmer-bg" />
          <Skeleton className="h-6 w-24 rounded-full shimmer-bg" />
          <Skeleton className="h-6 w-16 rounded-full shimmer-bg" />
        </div>
      </div>
    </div>
  );
}
