"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  TreePine,
  FlaskConical,
  Factory,
  Home,
  Settings,
  LogOut,
  User,
} from "lucide-react";

const roleConfig = {
  farmer: {
    title: "Farmer Dashboard",
    icon: Sprout,
    color: "text-green-600",
    bgColor: "bg-green-50",
    links: [
      { href: "/dashboard/farmer", label: "Overview", icon: Home },
      {
        href: "/dashboard/farmer/collection-events",
        label: "Collection Events",
        icon: Sprout,
      },
      { href: "/dashboard/analytics", label: "Analytics", icon: TreePine },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
  collector: {
    title: "Collector Dashboard",
    icon: TreePine,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    links: [
      { href: "/dashboard/collector", label: "Overview", icon: Home },
      {
        href: "/dashboard/collector/collection-events",
        label: "Collection Events",
        icon: TreePine,
      },
      { href: "/dashboard/analytics", label: "Analytics", icon: Factory },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
  lab: {
    title: "Lab Dashboard",
    icon: FlaskConical,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    links: [
      { href: "/dashboard/lab", label: "Overview", icon: Home },
      {
        href: "/dashboard/lab/quality-tests",
        label: "Quality Tests",
        icon: FlaskConical,
      },
      { href: "/dashboard/analytics", label: "Analytics", icon: TreePine },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
  manufacturer: {
    title: "Manufacturer Dashboard",
    icon: Factory,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    links: [
      { href: "/dashboard/manufacturer", label: "Overview", icon: Home },
      {
        href: "/dashboard/manufacturer/traceability",
        label: "Supply Chain",
        icon: TreePine,
      },
      { href: "/dashboard/analytics", label: "Analytics", icon: FlaskConical },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentRole, setCurrentRole] =
    useState<keyof typeof roleConfig>("farmer");
  const pathname = usePathname();

  const config = roleConfig[currentRole];
  const IconComponent = config.icon;
  if (pathname === "/dashboard") return null;
  if (pathname === "/dashboard/farmer") setCurrentRole("farmer");
  if (pathname === "/dashboard/collector") setCurrentRole("collector");
  if (pathname === "/dashboard/lab") setCurrentRole("lab");
  if (pathname === "/dashboard/manufacturer") setCurrentRole("manufacturer");
  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg", config.bgColor)}>
              <IconComponent className={cn("h-5 w-5", config.color)} />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground text-sm">
                {config.title}
              </h2>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-5">
          {config.links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 mb-2",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm">{link.label}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed ? (
          <Card className="p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" size="sm" className="flex-1 h-8">
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-8">
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
