import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
    viewMode?: 'table' | 'cards';
    className?: string;
}

export function ProductSkeleton({ viewMode = 'cards', className }: ProductSkeletonProps) {
    if (viewMode === 'table') {
        return (
            <div className={cn("flex flex-col md:flex-row items-center gap-4 p-3 bg-white rounded-lg border", className)}>
                {/* Image */}
                <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />

                {/* Content Container */}
                <div className="flex-1 min-w-0 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                    {/* Main Info */}
                    <div className="md:col-span-5 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-x-4 gap-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Price & Actions */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                        <div className="flex flex-col items-end gap-1">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-9 rounded-md" />
                            <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Card className={cn("h-full", className)}>
            <CardContent className="p-6 space-y-4">
                {/* Image */}
                <Skeleton className="w-full h-32 rounded-md" />

                {/* Content */}
                <div className="space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-5 w-4/5" />
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full mt-2" />

                    <div className="flex items-center justify-between pt-4">
                        <Skeleton className="h-6 w-20" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
