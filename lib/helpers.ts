export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateSustainabilityScore = (data: any): number => {
  let score = 100;

  // Deduct points for various factors
  if (data.pesticideLevel > 0.1) score -= 20;
  if (data.heavyMetals > 0.05) score -= 15;
  if (data.moisture > 12) score -= 10;
  if (!data.dnaAuthenticity) score -= 25;

  return Math.max(score, 0);
};

export const getLocationString = (lat: number, lng: number): string => {
  // Mock reverse geocoding
  const locations = [
    "Kerala, India",
    "Karnataka, India",
    "Tamil Nadu, India",
    "Uttarakhand, India",
    "Himachal Pradesh, India",
    "Rajasthan, India",
  ];

  return locations[Math.floor(Math.random() * locations.length)];
};
