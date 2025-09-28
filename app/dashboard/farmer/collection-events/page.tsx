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
import { MapPin, Sprout, Camera, Upload } from "lucide-react";
import { submitCollectionEvent } from "@/lib/api";
import type { CollectionEventData } from "@/lib/types";

export default function CollectionEventsPage() {
  const [formData, setFormData] = useState<CollectionEventData>({
    species: "",
    quantity: 0,
    location: "",
    moisture: 0,
    defects: 0,
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
        defects: 0,
        notes: "",
      });
      alert("Collection event submitted successfully!");
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
            Collection Events
          </h1>
          <p className="text-muted-foreground">
            Submit and manage your harvest collection events
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit New Collection Event */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Submit Collection Event
            </CardTitle>
            <CardDescription>
              Record a new harvest collection with GPS location and quality
              metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
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
                      <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                      <SelectItem value="turmeric">Turmeric</SelectItem>
                      <SelectItem value="brahmi">Brahmi</SelectItem>
                      <SelectItem value="neem">Neem</SelectItem>
                      <SelectItem value="tulsi">Tulsi</SelectItem>
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
                <Label htmlFor="location">Farm Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Field A-12"
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moisture">Moisture Content (%)</Label>
                  <Input
                    id="moisture"
                    type="number"
                    placeholder="12.5"
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
                  <Label htmlFor="defects">Visible Defects (%)</Label>
                  <Input
                    id="defects"
                    type="number"
                    placeholder="2.1"
                    value={formData.defects || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        defects: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional observations or notes..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop photos or click to browse
                  </p>
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
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
              Your submitted collection events and their status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* This would be populated from API call to getRecentEvents */}
            <div className="text-center text-muted-foreground py-8">
              <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent collection events found.</p>
              <p className="text-sm">
                Submit your first collection event to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
