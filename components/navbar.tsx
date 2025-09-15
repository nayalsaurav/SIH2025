"use client";

import { useState } from "react";
import { Leaf, Menu, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";
import { UserDropdown } from "@/components/user-dropdown";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending, error } = authClient.useSession();

  const navLinks = !session
    ? [
        { href: "/sign-in", label: "Sign In", variant: "ghost" },
        { href: "/sign-up", label: "Get Started", variant: "default" },
      ]
    : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AyurTrace</h1>
              <p className="text-xs text-muted-foreground">
                Blockchain Traceability
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : error ? (
              <span className="text-sm text-red-500">Error loading</span>
            ) : session?.user ? (
              <UserDropdown user={session.user} /> // ✅ dropdown for logged-in users
            ) : (
              navLinks.map(({ href, label, variant }) => (
                <Link key={href} href={href}>
                  <Button
                    variant={variant === "ghost" ? "ghost" : "default"}
                    className={
                      variant === "default"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "text-foreground"
                    }
                  >
                    {label}
                  </Button>
                </Link>
              ))
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 flex flex-col space-y-2"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground self-center" />
              ) : error ? (
                <span className="text-sm text-red-500 self-center">
                  Error loading
                </span>
              ) : session?.user ? (
                // On mobile we show dropdown trigger only
                <UserDropdown user={session.user} />
              ) : (
                navLinks.map(({ href, label, variant }) => (
                  <Link key={href} href={href}>
                    <Button
                      variant={variant === "ghost" ? "ghost" : "default"}
                      className={`w-full justify-start ${
                        variant === "default"
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {label}
                    </Button>
                  </Link>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
