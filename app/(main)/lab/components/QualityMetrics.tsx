import React from 'react';
import { Droplets, Award, Shield, Dna, AlertCircle, Container } from 'lucide-react';
import type { QualityTest } from '../../../../src/context/BlockchainContext';

interface QualityMetricsProps {
  qualityTests: QualityTest[];
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({ qualityTests }) => {
  const calculateAverages = () => {
    if (qualityTests.length === 0) return null;

    return qualityTests.reduce((acc, test) => {
      return {
        moisture: acc.moisture + test.testResults.moisture,
        pesticideLevel: acc.pesticideLevel + test.testResults.pesticideLevel,
        dnaAuthenticityPass: acc.dnaAuthenticityPass + (test.testResults.dnaAuthenticity ? 1 : 0),
        heavyMetals: acc.heavyMetals + test.testResults.heavyMetals,
        microbialLoad: acc.microbialLoad + test.testResults.microbialLoad,
      };
    }, {
      moisture: 0,
      pesticideLevel: 0,
      dnaAuthenticityPass: 0,
      heavyMetals: 0,
      microbialLoad: 0,
    });
  };

  const averages = calculateAverages();
  if (!averages) return <p className="text-gray-500">No quality test data available</p>;

  const totalTests = qualityTests.length;
  const stats = {
    moisture: averages.moisture / totalTests,
    pesticideLevel: averages.pesticideLevel / totalTests,
    dnaAuthenticityRate: (averages.dnaAuthenticityPass / totalTests) * 100,
    heavyMetals: averages.heavyMetals / totalTests,
    microbialLoad: averages.microbialLoad / totalTests,
  };

  const getStatusColor = (value: number, threshold: number, lowerIsBetter: boolean = true) => {
    if (lowerIsBetter) {
      return value <= threshold ? 'text-green-600' : 'text-red-600';
    }
    return value >= threshold ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Moisture Content */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Droplets className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">Moisture Content</h4>
            <p className={`text-2xl font-bold ${getStatusColor(stats.moisture, 10)}`}>
              {stats.moisture.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600">Target: ≤10%</p>
      </div>

      {/* DNA Authenticity */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Dna className="h-8 w-8 text-purple-500 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">DNA Authenticity</h4>
            <p className={`text-2xl font-bold ${getStatusColor(stats.dnaAuthenticityRate, 95)}`}>
              {stats.dnaAuthenticityRate.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600">Pass Rate Target: ≥95%</p>
      </div>

      {/* Contaminants */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-emerald-500 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">Contaminants</h4>
            <p className={`text-2xl font-bold ${getStatusColor(
              stats.pesticideLevel + stats.heavyMetals + stats.microbialLoad,
              0.2
            )}`}>
              {(stats.pesticideLevel + stats.heavyMetals + stats.microbialLoad).toFixed(3)} ppm
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600">Target: ≤0.2 ppm total</p>
      </div>
    </div>
  );
};

export default QualityMetrics;