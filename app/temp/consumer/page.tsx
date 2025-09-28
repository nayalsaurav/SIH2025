"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { QrCode, Search, History, Shield } from "lucide-react";
import { useBlockchain } from "@/context/BlockchainContext";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { formatDate } from "@/lib/helpers";

const glass =
  "backdrop-blur-lg bg-white/60 dark:bg-zinc-900/60 border border-white/30 dark:border-zinc-800/30 shadow-2xl";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
} as const;

function ConsumerPortal() {
  const { products, collections, qualityTests, processingSteps } =
    useBlockchain();
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.batchId === searchId);
    if (product) {
      setSearchResult(product);
      if (!searchHistory.includes(searchId)) {
        setSearchHistory((prev) => [searchId, ...prev.slice(0, 4)]);
      }
    } else {
      alert("Product not found. Please check the ID and try again.");
    }
  };

  const getQualityScore = (product: any) => {
    if (!product) return 0;
    const scores = product.qualityTests.map((test: any) => {
      let score = 0;
      if (test.testResults.dnaAuthenticity) score += 30;
      if (test.testResults.pesticides) score += 20;
      if (test.testResults.heavyMetals) score += 20;
      if (test.testResults.microbes) score += 20;
      score += Math.min(test.testResults.alkaloidContent * 10, 10);
      return score;
    });
    return Math.round(
      scores.reduce((a: number, b: number) => a + b, 0) / scores.length,
    );
  };

  return (
    <motion.div
      className="min-h-screen max-w-6xl mx-auto px-4 py-10 relative bg-gradient-to-br from-indigo-200/60 via-white/80 to-pink-200/60 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Header */}
      <motion.div
        className={`${glass} flex items-center gap-3 rounded-xl p-6 mb-10`}
        variants={fadeUp}
        custom={0}
      >
        <Shield className="h-10 w-10 text-indigo-700 drop-shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white drop-shadow">
            Product Verification Portal
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            Verify authenticity and track product journey
          </p>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        className={`${glass} rounded-2xl p-8 mb-10`}
        variants={fadeUp}
        custom={1}
      >
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Product Batch ID"
              className="flex-1 px-4 py-3 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 dark:bg-zinc-900/70 dark:border-zinc-700 dark:text-white"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-all flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Verify
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Product Details */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Product Info */}
          <motion.div
            className={`${glass} rounded-2xl p-8`}
            variants={fadeUp}
            custom={2}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                {searchResult.productName}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Batch ID: {searchResult.batchId}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manufacturer: {searchResult.manufacturer}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
                  Quality Score
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                    {getQualityScore(searchResult)}%
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {searchResult.finalQuality.certifications.map(
                        (cert: string) => (
                          <span
                            key={cert}
                            className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                          >
                            {cert}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2000}
                className="h-48"
              >
                <div className="h-full">
                  <QRCodeDisplay value={searchResult.batchId} size={180} />
                </div>
              </Tilt>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            className={`${glass} rounded-2xl p-8`}
            variants={fadeUp}
            custom={3}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
              Product Journey
            </h3>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200 dark:before:bg-zinc-700">
              {searchResult.collectionEvents.map((event: any, idx: number) => (
                <motion.div
                  key={event.id}
                  className="relative pl-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * idx }}
                >
                  <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-none" />
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400">
                      Collection
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Species: {event.species}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Quantity: {event.quantity} kg
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                      {formatDate(event.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {searchResult.processingSteps.map((step: any, idx: number) => (
                <motion.div
                  key={step.id}
                  className="relative pl-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 * idx }}
                >
                  <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-pink-500 shadow-lg shadow-pink-200 dark:shadow-none" />
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-700 dark:text-pink-400">
                      {step.step}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Conditions: {step.conditions.temperature}°C,{" "}
                      {step.conditions.humidity}% RH
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                      {formatDate(step.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Search History */}
      <motion.div
        className={`${glass} rounded-2xl p-8 mt-10`}
        variants={fadeUp}
        custom={4}
      >
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Recent Searches
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {searchHistory.map((id) => (
            <button
              key={id}
              onClick={() => setSearchId(id)}
              className="px-4 py-2 text-sm bg-white/50 dark:bg-zinc-800/50 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Page() {
  return <ConsumerPortal />;
}
