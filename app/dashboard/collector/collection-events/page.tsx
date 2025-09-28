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
import { Badge } from "@/components/ui/badge";
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
import {
  MapPin,
  TreePine,
  Camera,
  Upload,
  AlertTriangle,
  Wifi,
} from "lucide-react";
import { submitCollectionEvent } from "@/lib/api";
import type { CollectionEventData } from "@/lib/types";

export default function CollectorEventsPage() {
  const [formData, setFormData] = useState<CollectionEventData>({
    species: "",
    quantity: 0,
    location: "",
    moisture: 0,
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitCollectionEvent(formData);
      // Reset form or show success message
      setFormData({
        species: "",
        quantity: 0,
        location: "",
        moisture: 0,
        notes: "",
      });
      alert("Wild collection event submitted successfully!");
    } catch (error) {
      console.error("Failed to submit collection event:", error);
      alert("Failed to submit collection event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Wild Collection Events
          </h1>
          <p className="text-muted-foreground">
            Record wild herb collections with geo-tagging and risk assessment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Wifi className="h-3 w-3" />
            Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit New Collection Event */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5" />
              Record Wild Collection
            </CardTitle>
            <CardDescription>
              Submit geo-tagged wild herb collection with sustainability checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Wild Species</Label>
                  <Select
                    value={formData.species}
                    onValueChange={(value) =>
                      setFormData({ ...formData, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wild-ginseng">Wild Ginseng</SelectItem>
                      <SelectItem value="cordyceps">Cordyceps</SelectItem>
                      <SelectItem value="wild-turmeric">
                        Wild Turmeric
                      </SelectItem>
                      <SelectItem value="rhodiola">Rhodiola</SelectItem>
                      <SelectItem value="schisandra">Schisandra</SelectItem>
                      <SelectItem value="reishi">Reishi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.quantity || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Collection Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="GPS coordinates auto-filled"
                    className="flex-1"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                  <Button variant="outline" size="icon" type="button">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current location: 28.6139° N, 77.2090° E
                </p>
              </div>

              {/* Risk Assessment */}
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900">
                      Sustainability Check
                    </h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Medium risk area - Ensure sustainable harvesting practices
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-orange-700">
                      <p>• Leave 30% of plants for regeneration</p>
                      <p>• Avoid collection during breeding season</p>
                      <p>• Maximum 5kg per location per month</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moisture">Initial Moisture (%)</Label>
                <Input
                  id="moisture"
                  type="number"
                  placeholder="15.2"
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
                <Label htmlFor="hazards">Environmental Hazards</Label>
                <Textarea
                  id="hazards"
                  placeholder="Note any environmental risks, contamination sources, or unusual conditions..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Collection Photos</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Capture location and specimen photos
                  </p>
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="h-4 w-4 mr-2" />
                    Take Photos
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Collection Event"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Collection Events</CardTitle>
            <CardDescription>
              Your submitted wild collection events and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground py-8">
              <TreePine className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent collection events found.</p>
              <p className="text-sm">
                Submit your first wild collection event to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
