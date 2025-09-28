"use client";

import React, { useState } from "react";
import { Factory, Package, Thermometer, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { useBlockchain } from "@/context/BlockchainContext";
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

function ProcessorDashboard() {
  const {
    qualityTests,
    collections,
    processingSteps,
    addProcessingStep,
    createProduct,
  } = useBlockchain();

  const [processingData, setProcessingData] = useState({
    processorId: "PROC001",
    processorName: "Ayurvedic Processing Unit",
    step: "",
    conditions: {
      temperature: 25,
      humidity: 60,
      duration: 24,
    },
    inputBatch: "",
    outputBatch: "",
  });

  const processingSteps_list = [
    "Cleaning & Sorting",
    "Drying",
    "Grinding",
    "Sieving",
    "Storage",
    "Packaging",
    "Quality Control",
  ];

  const validatedCollections = collections.filter((collection) =>
    qualityTests.some(
      (test) => test.collectionEventId === collection.id && test.validated,
    ),
  );

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    const stepId = addProcessingStep({
      ...processingData,
      timestamp: new Date().toISOString(),
    });
    alert(`Processing step recorded with ID: ${stepId}`);
    setProcessingData((prev) => ({
      ...prev,
      step: "",
      inputBatch: "",
      outputBatch: "",
    }));
  };

  const handleCreateProduct = () => {
    const relatedCollections = validatedCollections.slice(0, 3);
    const relatedTests = relatedCollections
      .map((collection) =>
        qualityTests.find((test) => test.collectionEventId === collection.id),
      )
      .filter((test): test is NonNullable<typeof test> => test !== undefined);
    const relatedSteps = processingSteps.slice(-5);

    const productId = createProduct({
      batchId: `BATCH-${Date.now()}`,
      productName: "Ashwagandha Root Powder",
      manufacturer: "Ayurvedic Wellness Co.",
      collectionEvents: relatedCollections,
      qualityTests: relatedTests,
      processingSteps: relatedSteps,
      finalQuality: {
        overallScore: 94,
        certifications: ["AYUSH-CERTIFIED", "ORGANIC", "GMP"],
      },
      createdAt: new Date().toISOString(),
    });

    alert(`Product created with ID: ${productId}`);
  };

  return (
    <motion.div
      className="min-h-screen max-w-6xl mx-auto px-4 py-10 relative bg-gradient-to-br from-purple-200/60 via-white/80 to-zinc-200/60 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
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
        <Factory className="h-10 w-10 text-purple-700 drop-shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white drop-shadow">
            Processing Dashboard
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            {processingData.processorName} - ID: {processingData.processorId}
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 mb-10">
        {/* Add Step Form */}
        <motion.div
          className={`${glass} rounded-2xl p-8 shadow-xl`}
          variants={fadeUp}
          custom={1}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="inline-block rounded-full bg-purple-200 p-1">
              <Package className="h-5 w-5 text-purple-700" />
            </span>
            Add Processing Step
          </h2>
          <form onSubmit={handleAddStep} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-300">
                Processing Step
              </label>
              <select
                value={processingData.step}
                onChange={(e) =>
                  setProcessingData((prev) => ({
                    ...prev,
                    step: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-purple-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none dark:bg-zinc-900/70 dark:border-zinc-700 dark:text-white"
              >
                <option value="">Select processing step</option>
                {processingSteps_list.map((step) => (
                  <option key={step} value={step}>
                    {step}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-300">
                  Input Batch ID
                </label>
                <input
                  type="text"
                  value={processingData.inputBatch}
                  onChange={(e) =>
                    setProcessingData((prev) => ({
                      ...prev,
                      inputBatch: e.target.value,
                    }))
                  }
                  placeholder="e.g., COL001-001"
                  required
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-600 dark:bg-zinc-900/70 dark:border-zinc-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-300">
                  Output Batch ID
                </label>
                <input
                  type="text"
                  value={processingData.outputBatch}
                  onChange={(e) =>
                    setProcessingData((prev) => ({
                      ...prev,
                      outputBatch: e.target.value,
                    }))
                  }
                  placeholder="e.g., PROC001-001"
                  required
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-600 dark:bg-zinc-900/70 dark:border-zinc-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-purple-700 mb-2">
                Processing Conditions
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-800 dark:text-zinc-300">
                    <Thermometer className="h-3 w-3 inline mr-1" /> Temperature
                    (°C)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={processingData.conditions.temperature}
                    onChange={(e) =>
                      setProcessingData((prev) => ({
                        ...prev,
                        conditions: {
                          ...prev.conditions,
                          temperature: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-2 py-1 text-sm border border-zinc-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-purple-600 dark:bg-zinc-900/70 dark:border-zinc-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-800 dark:text-zinc-300">
                    <Droplets className="h-3 w-3 inline mr-1" /> Humidity (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={processingData.conditions.humidity}
                    onChange={(e) =>
                      setProcessingData((prev) => ({
                        ...prev,
                        conditions: {
                          ...prev.conditions,
                          humidity: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-2 py-1 text-sm border border-zinc-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-purple-600 dark:bg-zinc-900/70 dark:border-zinc-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-800 dark:text-zinc-300">
                    Duration (hrs)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={processingData.conditions.duration}
                    onChange={(e) =>
                      setProcessingData((prev) => ({
                        ...prev,
                        conditions: {
                          ...prev.conditions,
                          duration: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-2 py-1 text-sm border border-zinc-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-purple-600 dark:bg-zinc-900/70 dark:border-zinc-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all"
            >
              Add Processing Step
            </motion.button>
          </form>
        </motion.div>

        {/* Validated Batches List */}
        <motion.div
          className={`${glass} rounded-2xl p-8 shadow-xl`}
          variants={fadeUp}
          custom={2}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-5">
            Available Validated Batches
          </h2>
          <div className="space-y-4">
            {validatedCollections.map((collection, idx) => {
              const test = qualityTests.find(
                (t) => t.collectionEventId === collection.id,
              );
              return (
                <motion.div
                  key={collection.id}
                  className="relative border-l-4 border-purple-400 bg-white/80 dark:bg-zinc-800/70 rounded-lg p-4 shadow-md transition-all hover:shadow-purple-200 dark:hover:shadow-fuchsia-900 cursor-pointer group"
                  initial={{ opacity: 0, x: 30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.15 * idx }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-300">
                      {collection.species}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                      Validated
                    </span>
                  </div>
                  <div className="text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
                    <p>Quantity: {collection.quantity} kg</p>
                    <p>
                      Quality Score:{" "}
                      <span className="font-bold">
                        {test?.testResults.dnaAuthenticity ? (
                          <span className="text-green-500">✓ DNA Auth</span>
                        ) : (
                          <span className="text-red-500">✗ DNA Auth</span>
                        )}
                      </span>
                    </p>
                    <p>Collection ID: {collection.id}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Steps */}
      <motion.div
        className={`${glass} rounded-2xl p-8 shadow-xl mt-8`}
        variants={fadeUp}
        custom={3}
      >
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-5">
          Recent Processing Steps
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {processingSteps.slice(-4).map((step, idx) => (
            <motion.div
              key={step.id || idx}
              className="border-l-4 border-fuchsia-400 bg-white/80 dark:bg-zinc-800/70 rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.08 * idx }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-200">
                  {step.step}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    step.validated
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {step.validated ? "Validated" : "Pending"}
                </span>
              </div>
              <div className="text-xs text-zinc-700 dark:text-zinc-200">
                <p>
                  Input: <span className="font-mono">{step.inputBatch}</span>
                </p>
                <p>
                  Output: <span className="font-mono">{step.outputBatch}</span>
                </p>
                <p>
                  Conditions: {step.conditions.temperature}°C,{" "}
                  {step.conditions.humidity}% RH
                </p>
                <p>Duration: {step.conditions.duration} hours</p>
                <p>
                  Processed:{" "}
                  <span className="font-mono">
                    {formatDate(step.timestamp)}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Create Product */}
      <motion.div
        className={`${glass} rounded-2xl p-8 shadow-xl mt-8 text-center`}
        variants={fadeUp}
        custom={4}
      >
        <motion.button
          onClick={handleCreateProduct}
          disabled={validatedCollections.length === 0}
          whileHover={{ scale: validatedCollections.length ? 1.02 : 1 }}
          className={`py-3 px-8 rounded-lg font-semibold text-white transition-colors duration-150
            ${
              validatedCollections.length
                ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-lg hover:from-fuchsia-600 hover:to-purple-600"
                : "bg-zinc-300 cursor-not-allowed"
            }`}
        >
          Create Product with QR Code
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Page() {
  return <ProcessorDashboard />;
}
