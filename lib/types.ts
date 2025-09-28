export enum Role {
  FARMER = "FARMER",
  COLLECTOR = "COLLECTOR",
  LAB = "LAB",
  MANUFACTURER = "MANUFACTURER",
}

export enum BatchStatus {
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  RECALLED = "RECALLED",
  COMPLETED = "COMPLETED",
}

export enum EventType {
  COLLECTION = "COLLECTION",
  QUALITY_TEST = "QUALITY_TEST",
  PROCESSING_STEP = "PROCESSING_STEP",
  FORMULATION = "FORMULATION",
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: Role;
  mspId?: string;
  organization?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Batch {
  id: string;
  productName: string;
  species: string;
  qrToken: string;
  status: BatchStatus;
  createdAt: Date;
  updatedAt: Date;
  events: Event[];
  scans: ConsumerScan[];
}

export interface Event {
  id: string;
  eventType: EventType;
  batchId?: string;
  userId: string;
  previousEventId?: string;
  payloadUrl?: string;
  payloadHash: string;
  metadata: any;
  txId?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
  batch?: Batch;
  user: User;
  previousEvent?: Event;
  documents: Document[];
  labResult?: LabResult;
}

export interface Document {
  id: string;
  eventId: string;
  url: string;
  hash: string;
  type: string;
  createdAt: Date;
  event: Event;
}

export interface ConsumerScan {
  id: string;
  batchId: string;
  userId?: string;
  scannedAt: Date;
  device?: string;
  location?: any;
  batch: Batch;
}

export interface LabResult {
  id: string;
  eventId: string;
  moisture?: number;
  pesticide?: string;
  dnaVerified?: boolean;
  otherMetrics?: any;
  createdAt: Date;
  event: Event;
}

// API Response types for easier data fetching
export interface DashboardStats {
  totalCollections?: number;
  activeBatches?: number;
  complianceScore?: number;
  revenue?: number;
  samplesTestedCount?: number;
  pendingTestsCount?: number;
  passRate?: number;
  certificatesIssued?: number;
  inventoryStock?: number;
  qrCodesGenerated?: number;
}

export interface CollectionEventData {
  species: string;
  quantity: number;
  location: string;
  latitude?: number;
  longitude?: number;
  moisture?: number;
  defects?: number;
  notes?: string;
  photos?: string[];
}

export interface QualityTestData {
  batchId: string;
  moisture?: number;
  pesticide?: number;
  dnaVerified?: boolean;
  lead?: number;
  cadmium?: number;
  mercury?: number;
  notes?: string;
}

export interface Session {
  id: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  totalEvents: number;
  eventsByType: Record<string, number>;
  batchesByStatus: Record<string, number>;
  qualityMetrics: {
    averageMoisture: number;
    passRate: number;
    averageTestTime: number;
  };
  geographicDistribution: Array<{ region: string; count: number }>;
  monthlyTrends: Array<{
    month: string;
    collections: number;
    tests: number;
    processing: number;
  }>;
}

export interface TraceabilityData {
  batchId: string;
  productName: string;
  species: string;
  qrToken: string;
  status: BatchStatus;
  timeline: Array<{
    eventId: string;
    eventType: EventType;
    timestamp: Date;
    location?: { latitude: number; longitude: number };
    user: { name: string; role: Role; organization?: string };
    metadata: any;
    documents?: Document[];
    labResult?: LabResult;
  }>;
  totalScans: number;
  recentScans: ConsumerScan[];
}

export interface ProcessingStepData {
  batchId: string;
  processType: string;
  temperature?: number;
  duration?: number;
  equipment?: string;
  notes?: string;
  qualityChecks?: any;
}

export interface FormulationData {
  batchIds: string[];
  formulationType: string;
  ingredients: string[];
  batchSize: number;
  expiryDate: Date;
  notes?: string;
}
