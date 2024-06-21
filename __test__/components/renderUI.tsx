import { PortalProvider } from "@app/global-portal";
import { ReactNode } from "react";

export default function wrapper(
  { children }: { children: ReactNode },
  provider?: (props: { children: ReactNode }) => ReactNode,
) {
  if (provider) {
    return <PortalProvider>{provider({ children })}</PortalProvider>;
  }

  return <PortalProvider>{children}</PortalProvider>;
}
