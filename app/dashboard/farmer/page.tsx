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
  Sprout,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import { getDashboardStats, getRecentEvents } from "@/lib/api";
import type { DashboardStats, Event } from "@/lib/types";

export default function FarmerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardStats, events] = await Promise.all([
          getDashboardStats("FARMER"),
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
            Farmer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your harvest and track sustainability compliance
          </p>
        </div>
        <Button className="gap-2">
          <Sprout className="h-4 w-4" />
          New Collection Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Collections
            </CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalCollections || 0}
            </div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Batches
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBatches || 0}</div>
            <p className="text-xs text-muted-foreground">
              Currently in processing
            </p>
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
              Excellent sustainability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{stats.revenue?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Collection Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Recent Collection Events
            </CardTitle>
            <CardDescription>Your latest harvest activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {event.metadata.species}
                    </span>
                    <Badge
                      variant={
                        event.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
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
                    Quality: {event.metadata.quality}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Important updates and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">
                    Harvesting Window Alert
                  </h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Optimal harvesting period for Ashwagandha in Field A-15
                    starts in 3 days.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">
                    Smart Contract Confirmed
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Collection Event has been successfully recorded on
                    blockchain.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                  >
                    View Transaction
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    Document Upload Required
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Please upload organic certification for recent harvest.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                  >
                    Upload Document
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Sprout className="h-6 w-6" />
              Submit Collection Event
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <FileText className="h-6 w-6" />
              Upload Documents
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <TrendingUp className="h-6 w-6" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
