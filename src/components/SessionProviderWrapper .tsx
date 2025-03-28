"use client"; // Ensure this is a Client Component

import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
