"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Eye, Download, Factory } from "lucide-react";
import { getBatches } from "@/lib/api";
import type { Batch } from "@/lib/types";

export default function TraceabilityPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const batchData = await getBatches();
        setBatches(batchData);
      } catch (error) {
        console.error("Failed to load traceability data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading traceability data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Supply Chain Traceability
          </h1>
          <p className="text-muted-foreground">
            Track ingredients from source to final product with complete chain
            of custody
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Track Product or Batch
          </CardTitle>
          <CardDescription>
            Search by product ID, batch number, or QR code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Product/Batch ID</Label>
              <Input
                id="search"
                placeholder="Enter batch ID or scan QR code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Batches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Available Batches for Traceability
          </CardTitle>
          <CardDescription>
            Select a batch to view its complete supply chain journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {batches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map((batch) => (
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
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Species:</span>
                      <span className="ml-2 font-medium">{batch.species}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">QR Token:</span>
                      <span className="ml-2 font-medium">{batch.qrToken}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2 font-medium">
                        {batch.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Chain
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Factory className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No batches available for traceability.</p>
              <p className="text-sm">
                Batches will appear here once processing begins.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ingredient Origins Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Ingredient Origins Map
          </CardTitle>
          <CardDescription>
            Geographic visualization of ingredient sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Interactive map showing farm locations
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Rajasthan (Ashwagandha) • Kerala (Turmeric) • Himachal (Wild
                Ginseng)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
