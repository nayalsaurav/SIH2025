"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TreePine,
  MapPin,
  Calendar,
  Package,
  AlertTriangle,
  CheckCircle,
  QrCode,
} from "lucide-react";
import { getDashboardStats, getRecentEvents } from "@/lib/api";
import type { DashboardStats, Event } from "@/lib/types";

export default function CollectorDashboard() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardStats, events] = await Promise.all([
          getDashboardStats("COLLECTOR"),
          getRecentEvents("current_user_id", "COLLECTION"),
        ]);
        setStats(dashboardStats);
        setRecentEvents(events);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Collector Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track wild herb collection activities and manage inventory
          </p>
        </div>
        <Button className="gap-2">
          <TreePine className="h-4 w-4" />
          New Collection Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wild Collections
            </CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalCollections || 0}
            </div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.inventoryStock || 0} kg
            </div>
            <p className="text-xs text-muted-foreground">Across 12 species</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Score
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.complianceScore || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Sustainable practices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              QR Codes Generated
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.qrCodesGenerated || 0}
            </div>
            <p className="text-xs text-muted-foreground">Ready for dispatch</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Collection Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5" />
              Recent Wild Collections
            </CardTitle>
            <CardDescription>
              Your latest wild herb collection activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {event.metadata.species}
                      </span>
                      <Badge variant="default">approved</Badge>
                      <Badge variant="secondary">low risk</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.metadata.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {event.metadata.quantity} kg
                    </div>
                    <div className="text-sm text-muted-foreground">
                      #{event.id}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <TreePine className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent collection events found.</p>
                <p className="text-sm">
                  Submit your first collection event to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sustainability Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Sustainability Alerts
            </CardTitle>
            <CardDescription>
              Geo-fencing and compliance notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">
                    All Systems Operational
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    No sustainability alerts at this time. Keep up the good
                    work!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Current Inventory
          </CardTitle>
          <CardDescription>
            Wild herbs pending processing and dispatch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No inventory data available.</p>
            <p className="text-sm">
              Inventory will appear here after collection events are processed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
