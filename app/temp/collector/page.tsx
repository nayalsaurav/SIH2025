"use client";
import React, { useState } from "react";
import {
  MapPin,
  Leaf,
  Camera,
  Wifi,
  WifiOff,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useBlockchain } from "@/context/BlockchainContext";
import LocationPicker from "@/components/LocationPicker";
import QualityMetrics from "@/components/QualityMetrics";

const glass =
  "backdrop-blur-xl bg-white/75 dark:bg-zinc-900/80 border border-white/25 dark:border-zinc-800/30 shadow-xl";

function CollectorDashboard() {
  const { addCollectionEvent, collections } = useBlockchain();
  const [isOnline, setIsOnline] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [collectionData, setCollectionData] = useState({
    collectorId: "COL001",
    collectorName: "Ravi Kumar",
    species: "",
    location: { latitude: 0, longitude: 0, address: "" },
    quantity: 0,
    qualityMetrics: { moisture: 8, purity: 95, maturity: "optimal" },
  });

  const herbSpecies = [
    "Ashwagandha (Withania somnifera)",
    "Brahmi (Bacopa monnieri)",
    "Turmeric (Curcuma longa)",
    "Neem (Azadirachta indica)",
    "Tulsi (Ocimum tenuiflorum)",
    "Amla (Phyllanthus emblica)",
  ];

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setCollectionData((prev) => ({ ...prev, location }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventId = addCollectionEvent({
      ...collectionData,
      timestamp: new Date().toISOString(),
      sustainabilityScore: 92,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1800);
    setCollectionData((prev) => ({
      ...prev,
      species: "",
      quantity: 0,
      qualityMetrics: { moisture: 8, purity: 95, maturity: "optimal" },
    }));
  };

  const myCollections = collections.filter(
    (c) => c.collectorId === collectionData.collectorId,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <Leaf className="h-10 w-10 text-amber-200 drop-shadow-lg" />
          <div>
            <h1 className="text-3xl font-extrabold drop-shadow-md">
              Collector Dashboard
            </h1>
            <p className="text-green-100">
              {collectionData.collectorName} D ID: {collectionData.collectorId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full ml-0 md:ml-8 mt-6 md:mt-0">
          <motion.span
            animate={{
              scale: [1, 1.17, 1],
              opacity: isOnline ? [0.7, 1, 0.7] : 0.8,
            }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className={
              "w-3 h-3 rounded-full " +
              (isOnline
                ? "bg-green-300 shadow-green-400"
                : "bg-red-300 shadow-red-500")
            }
          />
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-100" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-200" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute top-4 right-8 animate-bounce"
          >
            <CheckCircle className="h-10 w-10 text-amber-200 drop-shadow-xl" />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`${glass} rounded-2xl shadow-2xl p-8`}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-7">
          🌿 Record New Collection
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
              Herb Species
              <span className="ml-2 text-xs text-green-600">(required)</span>
            </label>
            <select
              value={collectionData.species}
              onChange={(e) =>
                setCollectionData((prev) => ({
                  ...prev,
                  species: e.target.value,
                }))
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select herb species</option>
              {herbSpecies.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
              Collection Location
              <span className="ml-2 text-xs text-green-600">(required)</span>
            </label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {collectionData.location.address && (
              <p className="mt-2 text-sm text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-green-500" />
                {collectionData.location.address}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={collectionData.quantity}
              onChange={(e) =>
                setCollectionData((prev) => ({
                  ...prev,
                  quantity: parseFloat(e.target.value),
                }))
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <QualityMetrics
            metrics={collectionData.qualityMetrics}
            onChange={(metrics) =>
              setCollectionData((prev) => ({
                ...prev,
                qualityMetrics: metrics,
              }))
            }
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Collection Photos
              <span className="ml-2 text-xs text-gray-400">(coming soon)</span>
            </label>
            <Tilt scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 cursor-pointer transition">
                <div className="text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tap to capture photos</p>
                </div>
              </div>
            </Tilt>
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={
              !collectionData.species ||
              !collectionData.location.address ||
              !isOnline
            }
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Record Collection Event
          </motion.button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`${glass} rounded-2xl shadow-2xl p-8`}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          📜 Your Recent Collections
        </h2>
        <div className="space-y-6">
          {myCollections.map((collection) => (
            <Tilt key={collection.id} tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <motion.div
                whileHover={{
                  scale: 1.025,
                  boxShadow: "0 4px 18px 0 #22c55e29",
                }}
                className="border border-gray-200 bg-white/80 dark:bg-zinc-900/80 rounded-xl p-5 shadow hover:shadow-green-200/30 transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {collection.species}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                      collection.validated
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {collection.validated ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    {collection.validated ? "Validated" : "Pending"}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p>📦 Quantity: {collection.quantity} kg</p>
                  <p>📍 Location: {collection.location.address}</p>
                  <p>
                    🌱 Sustainability Score: {collection.sustainabilityScore}%
                  </p>
                  <p className="truncate">
                    🔗 Block Hash: {collection.blockHash}
                  </p>
                </div>
              </motion.div>
            </Tilt>
          ))}
          {myCollections.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No collections recorded yet
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Page() {
  return <CollectorDashboard />;
}
