"use client";

import { Navbar } from "@/components/navbar";
import { BlockchainProvider } from "../../src/context/BlockchainContext";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BlockchainProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container max-w-7xl mx-auto px-4 pt-20">
          {children}
        </main>
      </div>
    </BlockchainProvider>
  );
}
