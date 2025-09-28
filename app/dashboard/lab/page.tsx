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
  FlaskConical,
  TestTube,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Microscope,
  Shield,
} from "lucide-react";
import { getDashboardStats, getLabResults } from "@/lib/api";
import type { DashboardStats, LabResult } from "@/lib/types";

export default function LabDashboard() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardStats, results] = await Promise.all([
          getDashboardStats("LAB"),
          getLabResults(),
        ]);
        setStats(dashboardStats);
        setLabResults(results);
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
          <h1 className="text-3xl font-bold text-foreground">Lab Dashboard</h1>
          <p className="text-muted-foreground">
            Quality testing and validation for herb batches
          </p>
        </div>
        <Button className="gap-2">
          <TestTube className="h-4 w-4" />
          New Sample Test
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Samples Tested
            </CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.samplesTestedCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pendingTestsCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              In queue for testing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.passRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Quality compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Certificates Issued
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.certificatesIssued || 0}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Recent Lab Results
            </CardTitle>
            <CardDescription>Latest completed laboratory tests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {labResults.length > 0 ? (
              labResults.map((result) => (
                <div
                  key={result.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Lab Result</span>
                      <Badge
                        variant={result.dnaVerified ? "default" : "secondary"}
                      >
                        {result.dnaVerified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      #{result.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Moisture:</span>
                      <span className="ml-2 font-medium">
                        {result.moisture}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pesticide:</span>
                      <span className="ml-2 font-medium">
                        {result.pesticide}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      {result.createdAt.toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent test results found.</p>
                <p className="text-sm">
                  Test results will appear here after completion.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Results & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Laboratory equipment and compliance status
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
                    Laboratory equipment is functioning normally. No alerts at
                    this time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Quality Test Categories
          </CardTitle>
          <CardDescription>
            Overview of different test types and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                category: "Moisture Content",
                completed: 45,
                pending: 8,
                passRate: "98%",
                icon: FlaskConical,
              },
              {
                category: "Pesticide Screen",
                completed: 38,
                pending: 12,
                passRate: "89%",
                icon: Shield,
              },
              {
                category: "DNA Verification",
                completed: 32,
                pending: 6,
                passRate: "96%",
                icon: Microscope,
              },
              {
                category: "Heavy Metals",
                completed: 27,
                pending: 4,
                passRate: "94%",
                icon: TestTube,
              },
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium text-sm">{category.category}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{category.completed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending:</span>
                      <span className="font-medium">{category.pending}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pass Rate:</span>
                      <span className="font-medium text-green-600">
                        {category.passRate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
