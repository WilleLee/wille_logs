import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function useInternalRouter() {
  const router = useRouter();

  return useMemo(
    () => ({
      push: (path: Path) => router.push(path),
      goBack: () => router.back(),
      replace: (path: Path) => router.replace(path),
    }),
    [router],
  );
}

type Path = `/${string}`;
