"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Crosshair } from "lucide-react";
import { getLocationString } from "@/lib/helpers";

interface LocationPickerProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
}) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const address = getLocationString(latitude, longitude);

          setCurrentLocation({ latitude, longitude });
          onLocationSelect({ latitude, longitude, address });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to mock location for demo
          const latitude = 20.5937 + (Math.random() - 0.5) * 10;
          const longitude = 78.9629 + (Math.random() - 0.5) * 15;
          const address = getLocationString(latitude, longitude);

          setCurrentLocation({ latitude, longitude });
          onLocationSelect({ latitude, longitude, address });
          setIsGettingLocation(false);
        },
      );
    } else {
      // Fallback to mock location
      const latitude = 20.5937 + (Math.random() - 0.5) * 10;
      const longitude = 78.9629 + (Math.random() - 0.5) * 15;
      const address = getLocationString(latitude, longitude);

      setCurrentLocation({ latitude, longitude });
      onLocationSelect({ latitude, longitude, address });
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={getCurrentLocation}
        disabled={isGettingLocation}
        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isGettingLocation ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Getting Location...</span>
          </>
        ) : (
          <>
            <Crosshair className="h-4 w-4" />
            <span>Get Current Location</span>
          </>
        )}
      </button>

      {currentLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex items-center space-x-2 text-blue-800">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Location Captured</span>
          </div>
          <div className="text-sm text-blue-600 mt-1">
            Lat: {currentLocation.latitude.toFixed(6)}, Lng:{" "}
            {currentLocation.longitude.toFixed(6)}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
