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
  Factory,
  Package,
  QrCode,
  CheckCircle,
  MapPin,
  FileText,
} from "lucide-react";
import { getDashboardStats, getBatches } from "@/lib/api";
import type { DashboardStats, Batch } from "@/lib/types";

export default function ManufacturerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardStats, batchData] = await Promise.all([
          getDashboardStats("MANUFACTURER"),
          getBatches("ACTIVE"),
        ]);
        setStats(dashboardStats);
        setBatches(batchData);
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
            Manufacturer Dashboard
          </h1>
          <p className="text-muted-foreground">
            End-to-end supply chain tracking and product formulation
          </p>
        </div>
        <Button className="gap-2">
          <Factory className="h-4 w-4" />
          New Processing Step
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Batches
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.length}</div>
            <p className="text-xs text-muted-foreground">
              In various processing stages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products Formulated
            </CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">This month</p>
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
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Ready for market</p>
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
            <div className="text-2xl font-bold text-green-600">97%</div>
            <p className="text-xs text-muted-foreground">GACP adherence</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Processing Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Active Batches
            </CardTitle>
            <CardDescription>Current batches from schema data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {batches.length > 0 ? (
              batches.map((batch) => (
                <div key={batch.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{batch.productName}</span>
                      <Badge
                        variant={
                          batch.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {batch.status.toLowerCase()}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      #{batch.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Species:</span>
                      <span className="ml-2 font-medium">{batch.species}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">QR Token:</span>
                      <span className="ml-2 font-medium">{batch.qrToken}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      Created: {batch.createdAt.toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Factory className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active batches found.</p>
                <p className="text-sm">
                  New batches will appear here when processing begins.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supply Chain Traceability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Supply Chain Traceability
            </CardTitle>
            <CardDescription>
              Track ingredients from source to final product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">
                    Traceability System Active
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Full chain-of-custody tracking is operational. All batches
                    have complete provenance records.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                  >
                    View Traceability
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Formulations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Product Formulations
          </CardTitle>
          <CardDescription>
            Products ready for QR code generation and market distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No product formulations available.</p>
            <p className="text-sm">
              Complete batch processing to generate product formulations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance & Reporting
          </CardTitle>
          <CardDescription>
            GACP adherence and regulatory reporting status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">GACP Compliance</h4>
              <div className="space-y-3">
                {[
                  {
                    category: "Good Agricultural Practices",
                    score: 98,
                    status: "excellent",
                  },
                  {
                    category: "Collection Practices",
                    score: 95,
                    status: "good",
                  },
                  {
                    category: "Processing Standards",
                    score: 97,
                    status: "excellent",
                  },
                  { category: "Documentation", score: 94, status: "good" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Regulatory Reports</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">AYUSH Ministry Report</span>
                    <p className="text-sm text-muted-foreground">
                      Monthly compliance report
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Generate
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Export Documentation</span>
                    <p className="text-sm text-muted-foreground">
                      International shipment docs
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Sustainability Report</span>
                    <p className="text-sm text-muted-foreground">
                      Environmental impact assessment
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
