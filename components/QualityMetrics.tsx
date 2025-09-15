import React from "react";
import { Droplets, Award, Leaf } from "lucide-react";

interface QualityMetricsProps {
  metrics: {
    moisture: number;
    purity: number;
    maturity: string;
  };
  onChange: (metrics: {
    moisture: number;
    purity: number;
    maturity: string;
  }) => void;
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({
  metrics,
  onChange,
}) => {
  const maturityOptions = ["immature", "optimal", "mature", "over-mature"];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <Award className="h-5 w-5 mr-2 text-green-600" />
        Initial Quality Assessment
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Moisture Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Droplets className="h-4 w-4 inline mr-1" />
            Moisture Content (%)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={metrics.moisture}
            onChange={(e) =>
              onChange({ ...metrics, moisture: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <div className="mt-1">
            <div className={`w-full bg-gray-200 rounded-full h-2`}>
              <div
                className={`h-2 rounded-full ${
                  metrics.moisture <= 10
                    ? "bg-green-500"
                    : metrics.moisture <= 15
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min((metrics.moisture / 20) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Optimal: 10%</p>
          </div>
        </div>

        {/* Purity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Award className="h-4 w-4 inline mr-1" />
            Purity (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={metrics.purity}
            onChange={(e) =>
              onChange({ ...metrics, purity: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <div className="mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metrics.purity >= 90
                    ? "bg-green-500"
                    : metrics.purity >= 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${metrics.purity}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 90%</p>
          </div>
        </div>

        {/* Maturity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Leaf className="h-4 w-4 inline mr-1" />
            Maturity Level
          </label>
          <select
            value={metrics.maturity}
            onChange={(e) => onChange({ ...metrics, maturity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            {maturityOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {metrics.maturity === "optimal"
              ? "\u2713 Perfect harvest time"
              : metrics.maturity === "mature"
                ? "\u26a0 Good quality"
                : metrics.maturity === "immature"
                  ? "\u26a0 Early harvest"
                  : "\u26a0 Late harvest"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QualityMetrics;
