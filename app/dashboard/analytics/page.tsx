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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into supply chain performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quality Pass Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consumer Scans
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,456</div>
            <p className="text-xs text-muted-foreground">+18% engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Traceability Time
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-xs text-muted-foreground">-0.8 days faster</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collection Trends</CardTitle>
            <CardDescription>
              Monthly collection volumes by species
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Collection trends chart</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ashwagandha leading with 35% of total collections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Test Distribution</CardTitle>
            <CardDescription>
              Test results breakdown by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Quality distribution chart
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  94.2% pass rate across all test categories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>
            Supply chain metrics by geographic region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                region: "Rajasthan",
                batches: 342,
                quality: 96.1,
                species: "Ashwagandha, Turmeric",
              },
              {
                region: "Kerala",
                batches: 289,
                quality: 94.8,
                species: "Turmeric, Brahmi",
              },
              {
                region: "Himachal Pradesh",
                batches: 156,
                quality: 92.3,
                species: "Wild Ginseng, Cordyceps",
              },
              {
                region: "Karnataka",
                batches: 234,
                quality: 95.2,
                species: "Neem, Tulsi",
              },
            ].map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{region.region}</span>
                    <Badge variant="outline">{region.batches} batches</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Primary species: {region.species}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">
                    {region.quality}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quality score
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Sustainability Reports</CardTitle>
          <CardDescription>
            Regulatory compliance and sustainability metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                98.5%
              </div>
              <div className="text-sm font-medium mb-1">GACP Compliance</div>
              <div className="text-xs text-muted-foreground">
                Good Agricultural & Collection Practices
              </div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">96.2%</div>
              <div className="text-sm font-medium mb-1">
                Sustainability Score
              </div>
              <div className="text-xs text-muted-foreground">
                Environmental impact assessment
              </div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-sm font-medium mb-1">
                Traceability Coverage
              </div>
              <div className="text-xs text-muted-foreground">
                Complete chain of custody
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
