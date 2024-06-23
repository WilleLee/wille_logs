export function TagsSkeleton() {
  return (
    <div className="py-[2px]">
      <div className="flex h-[32px] w-full animate-skeleton-pulse items-center gap-[4px]">
        <div className="h-full w-[80px] rounded-[10px] bg-grey-300 dark:bg-grey-900" />
        <div className="h-full w-[80px] rounded-[10px] bg-grey-300 dark:bg-grey-900" />
        <div className="h-full w-[80px] rounded-[10px] bg-grey-300 dark:bg-grey-900" />
      </div>
    </div>
  );
}

export function ThreadsSkeleton() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid h-[120px] w-full animate-skeleton-pulse grid-rows-[5fr_3fr] gap-y-[8px] rounded-[10px] bg-grey-200 p-[16px] dark:bg-grey-900">
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800" />
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="grid h-[120px] w-full animate-skeleton-pulse grid-rows-[5fr_3fr] gap-y-[8px] rounded-[10px] bg-grey-200 p-[16px] dark:bg-grey-900">
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800" />
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="grid h-[120px] w-full animate-skeleton-pulse grid-rows-[5fr_3fr] gap-y-[8px] rounded-[10px] bg-grey-200 p-[16px] dark:bg-grey-900">
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800" />
        <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export function ThreadSkeleton() {
  return (
    <div className="grid h-[120px] w-full animate-skeleton-pulse grid-rows-[5fr_3fr] gap-y-[8px] rounded-[10px] bg-grey-200 p-[16px] dark:bg-grey-900">
      <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800" />
      <div className="h-full w-full rounded-[5px] bg-grey-300 dark:bg-grey-800">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
