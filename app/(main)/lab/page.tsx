"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Microscope, TestTube, Award, AlertCircle } from "lucide-react";
import { useBlockchain } from "@/context/BlockchainContext";
import { formatDate } from "@/lib/helpers";
import QualityMetrics from "./components/QualityMetrics";

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

function LabDashboard() {
  const { qualityTests, collections, addQualityTest } = useBlockchain();
  const [testData, setTestData] = useState({
    labId: "LAB001",
    labName: "Ayurvedic Research Lab",
    collectionEventId: "",
    testResults: {
      moisture: 0,
      pesticideLevel: 0,
      dnaAuthenticity: false,
      heavyMetals: 0,
      microbialLoad: 0,
    },
    certification: "AYUSH-CERTIFIED",
    notes: "",
  });

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    const testId = addQualityTest({
      ...testData,
      timestamp: new Date().toISOString(),
    });
    alert(`Quality test recorded with ID: ${testId}`);
    setTestData((prev) => ({
      ...prev,
      collectionEventId: "",
      testResults: {
        moisture: 0,
        pesticideLevel: 0,
        dnaAuthenticity: false,
        heavyMetals: 0,
        microbialLoad: 0,
      },
      certification: "AYUSH-CERTIFIED",
      notes: "",
    }));
  };

  const pendingCollections = collections.filter(
    (collection) =>
      !qualityTests.some((test) => test.collectionEventId === collection.id),
  );

  return (
    <motion.div
      className="min-h-screen max-w-6xl mx-auto px-4 py-10 relative bg-gradient-to-br from-cyan-200/60 via-white/80 to-emerald-200/60 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
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
        <Microscope className="h-10 w-10 text-cyan-700 drop-shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white drop-shadow">
            Laboratory Dashboard
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            {testData.labName} - ID: {testData.labId}
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Quality Test Form */}
        <motion.div
          className={`${glass} rounded-2xl p-8`}
          variants={fadeUp}
          custom={1}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="inline-block rounded-full bg-cyan-200 p-1">
              <TestTube className="h-5 w-5 text-cyan-700" />
            </span>
            Add Quality Test
          </h2>
          <form onSubmit={handleAddTest} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-300">
                Collection Batch
              </label>
              <select
                value={testData.collectionEventId}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    collectionEventId: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 dark:bg-zinc-900/70 dark:border-zinc-700 dark:text-white"
              >
                <option value="">Select collection batch</option>
                {pendingCollections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.species} - {collection.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                Test Parameters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={testData.testResults.dnaAuthenticity}
                    onChange={(e) =>
                      setTestData((prev) => ({
                        ...prev,
                        testResults: {
                          ...prev.testResults,
                          dnaAuthenticity: e.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-300">
                    DNA Authenticity
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={0}
                    value={testData.testResults.pesticideLevel}
                    onChange={(e) =>
                      setTestData((prev) => ({
                        ...prev,
                        testResults: {
                          ...prev.testResults,
                          pesticideLevel: parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="h-10 w-20 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-300">
                    Pesticide Level
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={0}
                    value={testData.testResults.heavyMetals}
                    onChange={(e) =>
                      setTestData((prev) => ({
                        ...prev,
                        testResults: {
                          ...prev.testResults,
                          heavyMetals: parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="h-10 w-20 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-300">
                    Heavy Metals
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={0}
                    value={testData.testResults.microbialLoad}
                    onChange={(e) =>
                      setTestData((prev) => ({
                        ...prev,
                        testResults: {
                          ...prev.testResults,
                          microbialLoad: parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="h-10 w-20 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-300">
                    Microbial Load
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-300">
                Notes
              </label>
              <textarea
                value={testData.notes}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-600 dark:bg-zinc-900/70 dark:border-zinc-700 dark:text-white"
                placeholder="Add any observations or special notes..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-cyan-600 hover:to-emerald-600 transition-all"
            >
              Submit Test Results
            </motion.button>
          </form>
        </motion.div>

        {/* Recent Tests */}
        <motion.div
          className={`${glass} rounded-2xl p-8`}
          variants={fadeUp}
          custom={2}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="inline-block rounded-full bg-emerald-200 p-1">
              <Award className="h-5 w-5 text-emerald-700" />
            </span>
            Recent Test Results
          </h2>
          <div className="space-y-4">
            {qualityTests.slice(-5).map((test, idx) => {
              const collection = collections.find(
                (c) => c.id === test.collectionEventId,
              );
              return (
                <motion.div
                  key={test.id}
                  className="relative border-l-4 border-emerald-400 bg-white/80 dark:bg-zinc-800/70 rounded-lg p-4 shadow-md"
                  initial={{ opacity: 0, x: 30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.15 * idx }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">
                      {collection?.species || "Unknown Species"}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        test.validated
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {test.validated ? "Validated" : "Pending"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="space-y-1">
                      <p>
                        DNA Auth: {test.testResults.dnaAuthenticity ? "✓" : "✗"}
                      </p>
                      <p>
                        Pesticide Level:{" "}
                        {test.testResults.pesticideLevel > 0 ? "⚠️" : "✓"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        Heavy Metals:{" "}
                        {test.testResults.heavyMetals > 0 ? "⚠️" : "✓"}
                      </p>
                      <p>
                        Microbial Load:{" "}
                        {test.testResults.microbialLoad > 0 ? "⚠️" : "✓"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                    Tested: {formatDate(test.timestamp)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quality Metrics */}
      <motion.div
        className={`${glass} rounded-2xl p-8 mt-10`}
        variants={fadeUp}
        custom={3}
      >
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="inline-block rounded-full bg-emerald-200 p-1">
            <AlertCircle className="h-5 w-5 text-emerald-700" />
          </span>
          Quality Metrics Overview
        </h2>
        <QualityMetrics qualityTests={qualityTests} />
      </motion.div>
    </motion.div>
  );
}

export default function Page() {
  return <LabDashboard />;
}
