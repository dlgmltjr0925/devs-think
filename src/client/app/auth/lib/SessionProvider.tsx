"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

export const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return <Provider session={session}>{children}</Provider>;
};
