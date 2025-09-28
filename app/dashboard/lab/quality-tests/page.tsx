"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlaskConical, TestTube, Clock, CheckCircle } from "lucide-react";
import { submitQualityTest } from "@/lib/api";
import type { QualityTestData } from "@/lib/types";

export default function QualityTestsPage() {
  const [formData, setFormData] = useState<QualityTestData>({
    batchId: "",
    moisture: 0,
    pesticide: 0,
    dnaVerified: undefined,
    lead: 0,
    cadmium: 0,
    mercury: 0,
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitQualityTest(formData);
      // Reset form or show success message
      setFormData({
        batchId: "",
        moisture: 0,
        pesticide: 0,
        dnaVerified: undefined,
        lead: 0,
        cadmium: 0,
        mercury: 0,
        notes: "",
      });
      alert("Quality test results submitted successfully!");
    } catch (error) {
      console.error("Failed to submit quality test:", error);
      alert("Failed to submit quality test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quality Tests</h1>
          <p className="text-muted-foreground">
            Record and manage quality test results for herb batches
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Test Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Record Test Results
            </CardTitle>
            <CardDescription>
              Enter quality test results for batch samples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchId">Batch ID</Label>
                  <Select
                    value={formData.batchId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, batchId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CE001">CE001 - Ashwagandha</SelectItem>
                      <SelectItem value="WC002">
                        WC002 - Wild Ginseng
                      </SelectItem>
                      <SelectItem value="CE003">CE003 - Turmeric</SelectItem>
                      <SelectItem value="WC004">WC004 - Cordyceps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testType">Test Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moisture">Moisture Content</SelectItem>
                      <SelectItem value="pesticide">
                        Pesticide Screen
                      </SelectItem>
                      <SelectItem value="dna">DNA Verification</SelectItem>
                      <SelectItem value="heavy-metals">Heavy Metals</SelectItem>
                      <SelectItem value="full-panel">Full Panel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Test Results Section */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium">Test Results</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="moisture">Moisture Content (%)</Label>
                    <Input
                      id="moisture"
                      type="number"
                      placeholder="12.5"
                      step="0.1"
                      value={formData.moisture || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          moisture: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticide">Pesticide Level (ppm)</Label>
                    <Input
                      id="pesticide"
                      type="number"
                      placeholder="0.05"
                      step="0.01"
                      value={formData.pesticide || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pesticide: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dnaVerified">DNA Barcode Verification</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        dnaVerified: value === "verified",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">
                        Verified - Species Confirmed
                      </SelectItem>
                      <SelectItem value="failed">
                        Failed - Species Mismatch
                      </SelectItem>
                      <SelectItem value="inconclusive">
                        Inconclusive - Retest Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lead">Lead (ppm)</Label>
                    <Input
                      id="lead"
                      type="number"
                      placeholder="0.02"
                      step="0.01"
                      value={formData.lead || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lead: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cadmium">Cadmium (ppm)</Label>
                    <Input
                      id="cadmium"
                      type="number"
                      placeholder="0.01"
                      step="0.01"
                      value={formData.cadmium || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cadmium: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mercury">Mercury (ppm)</Label>
                    <Input
                      id="mercury"
                      type="number"
                      placeholder="0.005"
                      step="0.001"
                      value={formData.mercury || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mercury: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Check */}
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">
                      Compliance Status
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      All parameters within acceptable limits. Batch approved
                      for processing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Lab Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional observations, methodology notes, or recommendations..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Test Results"}
                </Button>
                <Button variant="outline" type="button">
                  Generate Certificate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>
              Latest completed quality tests and their outcomes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground py-8">
              <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent test results found.</p>
              <p className="text-sm">
                Submit your first quality test to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Test Queue
          </CardTitle>
          <CardDescription>
            Pending samples awaiting quality testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No pending tests in queue.</p>
            <p className="text-sm">
              New samples will appear here when submitted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
