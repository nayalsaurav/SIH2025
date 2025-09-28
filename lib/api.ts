import type {
  Event,
  Batch,
  User,
  LabResult,
  DashboardStats,
  CollectionEventData,
  QualityTestData,
  Document,
  ConsumerScan,
  Session,
  TraceabilityData,
  ProcessingStepData,
  FormulationData,
} from "./types";

// Mock API functions - replace with actual API calls to your backend
export async function getDashboardStats(
  userRole: string,
): Promise<DashboardStats> {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStats: DashboardStats = {
        totalCollections:
          userRole === "FARMER"
            ? 24
            : userRole === "COLLECTOR"
              ? 18
              : undefined,
        activeBatches: userRole === "FARMER" ? 8 : undefined,
        complianceScore:
          userRole === "FARMER"
            ? 98
            : userRole === "COLLECTOR"
              ? 95
              : undefined,
        revenue: userRole === "FARMER" ? 45230 : undefined,
        samplesTestedCount: userRole === "LAB" ? 142 : undefined,
        pendingTestsCount: userRole === "LAB" ? 23 : undefined,
        passRate: userRole === "LAB" ? 94.2 : undefined,
        certificatesIssued: userRole === "LAB" ? 89 : undefined,
        inventoryStock: userRole === "COLLECTOR" ? 156 : undefined,
        qrCodesGenerated: userRole === "COLLECTOR" ? 12 : undefined,
      };
      resolve(mockStats);
    }, 100);
  });
}

export async function getRecentEvents(
  userId?: string,
  eventType?: string,
  batchId?: string,
): Promise<Event[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockEvents: Event[] = [
        {
          id: "evt_001",
          eventType: "COLLECTION",
          batchId: "batch_001",
          userId: userId || "user_001",
          previousEventId: null,
          payloadUrl: "/api/payload/evt_001",
          payloadHash: "hash_collection_123",
          metadata: {
            species: "Withania somnifera",
            quantity: 25.5,
            location: "Field A-12, Green Valley Farm",
            moisture: 11.2,
            defects: 1.8,
            harvestMethod: "Hand-picked",
            weather: "Sunny, 28°C",
          },
          txId: "tx_blockchain_001",
          latitude: 26.9124,
          longitude: 75.7873,
          createdAt: new Date("2024-01-15T08:30:00"),
          updatedAt: new Date("2024-01-15T08:30:00"),
          user: {
            id: "user_001",
            name: "John Farmer",
            email: "john@farm.com",
            role: "FARMER",
          } as User,
          documents: [],
        },
        {
          id: "evt_002",
          eventType: "QUALITY_TEST",
          batchId: "batch_001",
          userId: "user_003",
          previousEventId: "evt_001",
          payloadUrl: "/api/payload/evt_002",
          payloadHash: "hash_quality_456",
          metadata: {
            testType: "Comprehensive Quality Analysis",
            labId: "LAB_001",
            sampleSize: 100,
            testDate: "2024-01-16",
          },
          txId: "tx_blockchain_002",
          latitude: 26.92,
          longitude: 75.79,
          createdAt: new Date("2024-01-16T14:20:00"),
          updatedAt: new Date("2024-01-16T14:20:00"),
          user: {
            id: "user_003",
            name: "Dr. Mike Lab",
            email: "mike@qualitylab.com",
            role: "LAB",
          } as User,
          documents: [],
        },
        {
          id: "evt_003",
          eventType: "PROCESSING_STEP",
          batchId: "batch_001",
          userId: "user_004",
          previousEventId: "evt_002",
          payloadUrl: "/api/payload/evt_003",
          payloadHash: "hash_processing_789",
          metadata: {
            processType: "Drying and Grinding",
            temperature: 45,
            duration: 24,
            equipment: "Industrial Dryer Model X200",
          },
          txId: "tx_blockchain_003",
          latitude: 26.93,
          longitude: 75.8,
          createdAt: new Date("2024-01-18T10:15:00"),
          updatedAt: new Date("2024-01-18T10:15:00"),
          user: {
            id: "user_004",
            name: "Lisa Manufacturer",
            email: "lisa@herbproducts.com",
            role: "MANUFACTURER",
          } as User,
          documents: [],
        },
        {
          id: "evt_004",
          eventType: "FORMULATION",
          batchId: "batch_002",
          userId: "user_004",
          previousEventId: null,
          payloadUrl: "/api/payload/evt_004",
          payloadHash: "hash_formulation_abc",
          metadata: {
            formulationType: "Capsule Formation",
            ingredients: [
              "Turmeric Extract",
              "Black Pepper",
              "Gelatin Capsule",
            ],
            batchSize: 1000,
            expiryDate: "2026-01-18",
          },
          txId: "tx_blockchain_004",
          latitude: 26.93,
          longitude: 75.8,
          createdAt: new Date("2024-01-19T16:45:00"),
          updatedAt: new Date("2024-01-19T16:45:00"),
          user: {
            id: "user_004",
            name: "Lisa Manufacturer",
            email: "lisa@herbproducts.com",
            role: "MANUFACTURER",
          } as User,
          documents: [],
        },
      ];

      let filteredEvents = mockEvents;
      if (userId) {
        filteredEvents = filteredEvents.filter(
          (event) => event.userId === userId,
        );
      }
      if (eventType) {
        filteredEvents = filteredEvents.filter(
          (event) => event.eventType === eventType,
        );
      }
      if (batchId) {
        filteredEvents = filteredEvents.filter(
          (event) => event.batchId === batchId,
        );
      }

      resolve(filteredEvents);
    }, 100);
  });
}

export async function getBatches(
  status?: string,
  userId?: string,
): Promise<Batch[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockBatches: Batch[] = [
        {
          id: "batch_001",
          productName: "Organic Ashwagandha",
          species: "Withania somnifera",
          qrToken: "QR_ASH_001_2024",
          status: "ACTIVE",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-20"),
          events: [],
          scans: [],
        },
        {
          id: "batch_002",
          productName: "Wild Turmeric",
          species: "Curcuma longa",
          qrToken: "QR_TUR_002_2024",
          status: "ACTIVE",
          createdAt: new Date("2024-01-16"),
          updatedAt: new Date("2024-01-21"),
          events: [],
          scans: [],
        },
        {
          id: "batch_003",
          productName: "Brahmi Extract",
          species: "Bacopa monnieri",
          qrToken: "QR_BRA_003_2024",
          status: "COMPLETED",
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-18"),
          events: [],
          scans: [],
        },
        {
          id: "batch_004",
          productName: "Neem Powder",
          species: "Azadirachta indica",
          qrToken: "QR_NEE_004_2024",
          status: "REJECTED",
          createdAt: new Date("2024-01-12"),
          updatedAt: new Date("2024-01-19"),
          events: [],
          scans: [],
        },
      ];

      let filteredBatches = mockBatches;
      if (status) {
        filteredBatches = filteredBatches.filter(
          (batch) => batch.status === status,
        );
      }
      resolve(filteredBatches);
    }, 100);
  });
}

export async function getLabResults(
  eventId?: string,
  batchId?: string,
): Promise<LabResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults: LabResult[] = [
        {
          id: "lab_001",
          eventId: eventId || "evt_002",
          moisture: 11.2,
          pesticide: "0.03 ppm",
          dnaVerified: true,
          otherMetrics: {
            lead: 0.02,
            cadmium: 0.01,
            mercury: 0.005,
            arsenic: 0.008,
            aflatoxins: 0.5,
            totalAsh: 8.2,
            acidInsoluble: 2.1,
          },
          createdAt: new Date("2024-01-16T14:30:00"),
          event: {} as Event,
        },
        {
          id: "lab_002",
          eventId: "evt_005",
          moisture: 9.8,
          pesticide: "0.01 ppm",
          dnaVerified: true,
          otherMetrics: {
            lead: 0.01,
            cadmium: 0.005,
            mercury: 0.002,
            arsenic: 0.004,
            aflatoxins: 0.2,
            totalAsh: 7.8,
            acidInsoluble: 1.9,
          },
          createdAt: new Date("2024-01-17T11:15:00"),
          event: {} as Event,
        },
      ];

      const filteredResults = eventId
        ? mockResults.filter((result) => result.eventId === eventId)
        : mockResults;
      resolve(filteredResults);
    }, 100);
  });
}

// User Management APIs
export async function getUsers(role?: string): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: "user_001",
          name: "John Farmer",
          email: "john@farm.com",
          emailVerified: true,
          image: "/diverse-farmers-harvest.png",
          role: "FARMER",
          mspId: "MSP_FARMER_001",
          organization: "Green Valley Cooperative",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-15"),
          sessions: [],
          accounts: [],
          events: [],
        },
        {
          id: "user_002",
          name: "Sarah Collector",
          email: "sarah@wildherbs.com",
          emailVerified: true,
          image: "/antique-collector.png",
          role: "COLLECTOR",
          mspId: "MSP_COLLECTOR_001",
          organization: "Wild Harvest Co.",
          createdAt: new Date("2024-01-02"),
          updatedAt: new Date("2024-01-16"),
          sessions: [],
          accounts: [],
          events: [],
        },
        {
          id: "user_003",
          name: "Dr. Mike Lab",
          email: "mike@qualitylab.com",
          emailVerified: true,
          image: "/scientist-in-lab.png",
          role: "LAB",
          mspId: "MSP_LAB_001",
          organization: "Herbal Quality Labs",
          createdAt: new Date("2024-01-03"),
          updatedAt: new Date("2024-01-17"),
          sessions: [],
          accounts: [],
          events: [],
        },
        {
          id: "user_004",
          name: "Lisa Manufacturer",
          email: "lisa@herbproducts.com",
          emailVerified: true,
          image: "/manufacturing-plant.png",
          role: "MANUFACTURER",
          mspId: "MSP_MANUFACTURER_001",
          organization: "Premium Herbal Products",
          createdAt: new Date("2024-01-04"),
          updatedAt: new Date("2024-01-18"),
          sessions: [],
          accounts: [],
          events: [],
        },
      ];

      const filteredUsers = role
        ? mockUsers.filter((user) => user.role === role)
        : mockUsers;
      resolve(filteredUsers);
    }, 100);
  });
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((user) => user.id === id) || null;
}

export async function updateUser(
  id: string,
  data: Partial<User>,
): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser: User = {
        id,
        name: data.name || "Updated User",
        email: data.email || "updated@example.com",
        emailVerified: data.emailVerified || true,
        image: data.image,
        role: data.role || "FARMER",
        mspId: data.mspId,
        organization: data.organization,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        sessions: [],
        accounts: [],
        events: [],
      };
      resolve(updatedUser);
    }, 200);
  });
}

// Session Management APIs
export async function getUserSessions(userId: string): Promise<Session[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSessions: Session[] = [
        {
          id: "session_001",
          token: "token_abc123",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
          ipAddress: "192.168.1.100",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      resolve(mockSessions);
    }, 100);
  });
}

export async function createSession(
  userId: string,
  token: string,
): Promise<Session> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSession: Session = {
        id: `session_${Date.now()}`,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0",
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      resolve(newSession);
    }, 200);
  });
}

// Document Management APIs
export async function getDocuments(eventId?: string): Promise<Document[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockDocuments: Document[] = [
        {
          id: "doc_001",
          eventId: eventId || "evt_001",
          url: "/formal-certificate.png",
          hash: "doc_hash_123",
          type: "certificate",
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "doc_002",
          eventId: eventId || "evt_001",
          url: "/abstract-colorful-photo.png",
          hash: "doc_hash_456",
          type: "photo",
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "doc_003",
          eventId: eventId || "evt_002",
          url: "/government-permit.png",
          hash: "doc_hash_789",
          type: "permit",
          createdAt: new Date("2024-01-16"),
        },
      ];

      const filteredDocs = eventId
        ? mockDocuments.filter((doc) => doc.eventId === eventId)
        : mockDocuments;
      resolve(filteredDocs);
    }, 100);
  });
}

export async function uploadDocument(
  eventId: string,
  file: File,
  type: string,
): Promise<Document> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDocument: Document = {
        id: `doc_${Date.now()}`,
        eventId,
        url: `/uploads/${file.name}`,
        hash: `hash_${Date.now()}`,
        type,
        createdAt: new Date(),
      };
      resolve(newDocument);
    }, 1000);
  });
}

// Consumer Scan APIs
export async function getConsumerScans(
  batchId?: string,
): Promise<ConsumerScan[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockScans: ConsumerScan[] = [
        {
          id: "scan_001",
          batchId: batchId || "batch_001",
          userId: "consumer_001",
          scannedAt: new Date("2024-01-20T10:30:00"),
          device: "iPhone 15",
          location: {
            city: "Mumbai",
            country: "India",
            lat: 19.076,
            lng: 72.8777,
          },
        },
        {
          id: "scan_002",
          batchId: batchId || "batch_001",
          userId: null,
          scannedAt: new Date("2024-01-20T14:15:00"),
          device: "Samsung Galaxy S24",
          location: {
            city: "Delhi",
            country: "India",
            lat: 28.6139,
            lng: 77.209,
          },
        },
        {
          id: "scan_003",
          batchId: batchId || "batch_002",
          userId: "consumer_002",
          scannedAt: new Date("2024-01-21T09:45:00"),
          device: "Google Pixel 8",
          location: {
            city: "Bangalore",
            country: "India",
            lat: 12.9716,
            lng: 77.5946,
          },
        },
      ];

      const filteredScans = batchId
        ? mockScans.filter((scan) => scan.batchId === batchId)
        : mockScans;
      resolve(filteredScans);
    }, 100);
  });
}

export async function recordConsumerScan(
  batchId: string,
  userId?: string,
  device?: string,
  location?: any,
): Promise<ConsumerScan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newScan: ConsumerScan = {
        id: `scan_${Date.now()}`,
        batchId,
        userId: userId || null,
        scannedAt: new Date(),
        device: device || "Unknown Device",
        location: location || null,
      };
      resolve(newScan);
    }, 200);
  });
}

// Enhanced Event APIs
export async function createEvent(data: {
  eventType: string;
  batchId?: string;
  userId: string;
  metadata: any;
  latitude?: number;
  longitude?: number;
}): Promise<Event> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt_${Date.now()}`,
        eventType: data.eventType as any,
        batchId: data.batchId,
        userId: data.userId,
        previousEventId: null,
        payloadUrl: `/api/payload/evt_${Date.now()}`,
        payloadHash: `hash_${Date.now()}`,
        metadata: data.metadata,
        txId: `tx_${Date.now()}`,
        latitude: data.latitude,
        longitude: data.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {} as User,
        documents: [],
      };
      resolve(newEvent);
    }, 500);
  });
}

export async function getEventById(id: string): Promise<Event | null> {
  const events = await getRecentEvents();
  return events.find((event) => event.id === id) || null;
}

// Enhanced Lab Result APIs
export async function createLabResult(data: {
  eventId: string;
  moisture?: number;
  pesticide?: string;
  dnaVerified?: boolean;
  otherMetrics?: any;
}): Promise<LabResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newResult: LabResult = {
        id: `lab_${Date.now()}`,
        eventId: data.eventId,
        moisture: data.moisture,
        pesticide: data.pesticide,
        dnaVerified: data.dnaVerified,
        otherMetrics: data.otherMetrics,
        createdAt: new Date(),
        event: {} as Event,
      };
      resolve(newResult);
    }, 500);
  });
}

// Analytics and Reporting APIs
export async function getAnalyticsData(
  userId?: string,
  role?: string,
  dateRange?: { start: Date; end: Date },
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAnalytics = {
        totalEvents: 156,
        eventsByType: {
          COLLECTION: 45,
          QUALITY_TEST: 38,
          PROCESSING_STEP: 42,
          FORMULATION: 31,
        },
        batchesByStatus: {
          ACTIVE: 23,
          COMPLETED: 67,
          REJECTED: 8,
          RECALLED: 2,
        },
        qualityMetrics: {
          averageMoisture: 10.8,
          passRate: 94.2,
          averageTestTime: 2.3,
        },
        geographicDistribution: [
          { region: "North India", count: 45 },
          { region: "South India", count: 38 },
          { region: "West India", count: 42 },
          { region: "East India", count: 31 },
        ],
        monthlyTrends: [
          { month: "Jan", collections: 45, tests: 38, processing: 42 },
          { month: "Feb", collections: 52, tests: 41, processing: 48 },
          { month: "Mar", collections: 48, tests: 39, processing: 45 },
        ],
      };
      resolve(mockAnalytics);
    }, 200);
  });
}

export async function submitCollectionEvent(
  data: CollectionEventData,
): Promise<Event> {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt_${Date.now()}`,
        eventType: "COLLECTION",
        userId: "current_user_id",
        payloadHash: `hash_${Date.now()}`,
        metadata: data,
        latitude: data.latitude,
        longitude: data.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {} as User,
        documents: [],
      };
      resolve(newEvent);
    }, 500);
  });
}

export async function submitQualityTest(
  data: QualityTestData,
): Promise<LabResult> {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newResult: LabResult = {
        id: `lab_${Date.now()}`,
        eventId: `evt_${Date.now()}`,
        moisture: data.moisture,
        pesticide: data.pesticide?.toString(),
        dnaVerified: data.dnaVerified,
        otherMetrics: {
          lead: data.lead,
          cadmium: data.cadmium,
          mercury: data.mercury,
        },
        createdAt: new Date(),
        event: {} as Event,
      };
      resolve(newResult);
    }, 500);
  });
}

export async function updateBatchStatus(
  id: string,
  status: string,
): Promise<Batch> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedBatch: Batch = {
        id,
        productName: "Updated Batch",
        species: "Updated Species",
        qrToken: `QR_${id}`,
        status: status as any,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
        events: [],
        scans: [],
      };
      resolve(updatedBatch);
    }, 200);
  });
}

export async function createBatch(data: {
  productName: string;
  species: string;
  qrToken: string;
}): Promise<Batch> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBatch: Batch = {
        id: `batch_${Date.now()}`,
        productName: data.productName,
        species: data.species,
        qrToken: data.qrToken,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
        events: [],
        scans: [],
      };
      resolve(newBatch);
    }, 300);
  });
}

export async function getBatchById(id: string): Promise<Batch | null> {
  const batches = await getBatches();
  return batches.find((batch) => batch.id === id) || null;
}

// Comprehensive Traceability API functions
export async function getTraceabilityData(
  batchId: string,
): Promise<TraceabilityData> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const batch = await getBatchById(batchId);
      const events = await getRecentEvents(undefined, undefined, batchId);
      const scans = await getConsumerScans(batchId);

      if (!batch) {
        throw new Error("Batch not found");
      }

      const timeline = await Promise.all(
        events.map(async (event) => {
          const documents = await getDocuments(event.id);
          const labResults =
            event.eventType === "QUALITY_TEST"
              ? await getLabResults(event.id)
              : [];

          return {
            eventId: event.id,
            eventType: event.eventType,
            timestamp: event.createdAt,
            location:
              event.latitude && event.longitude
                ? { latitude: event.latitude, longitude: event.longitude }
                : undefined,
            user: {
              name: event.user.name,
              role: event.user.role,
              organization: event.user.organization,
            },
            metadata: event.metadata,
            documents: documents.length > 0 ? documents : undefined,
            labResult: labResults.length > 0 ? labResults[0] : undefined,
          };
        }),
      );

      const traceabilityData: TraceabilityData = {
        batchId: batch.id,
        productName: batch.productName,
        species: batch.species,
        qrToken: batch.qrToken,
        status: batch.status,
        timeline: timeline.sort(
          (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
        ),
        totalScans: scans.length,
        recentScans: scans.slice(-5), // Last 5 scans
      };

      resolve(traceabilityData);
    }, 300);
  });
}

export async function submitProcessingStep(
  data: ProcessingStepData,
): Promise<Event> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt_${Date.now()}`,
        eventType: "PROCESSING_STEP",
        batchId: data.batchId,
        userId: "current_user_id", // Replace with actual user ID
        previousEventId: null,
        payloadUrl: `/api/payload/evt_${Date.now()}`,
        payloadHash: `hash_${Date.now()}`,
        metadata: {
          processType: data.processType,
          temperature: data.temperature,
          duration: data.duration,
          equipment: data.equipment,
          notes: data.notes,
          qualityChecks: data.qualityChecks,
        },
        txId: `tx_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {} as User,
        documents: [],
      };
      resolve(newEvent);
    }, 500);
  });
}

export async function submitFormulation(data: FormulationData): Promise<Event> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt_${Date.now()}`,
        eventType: "FORMULATION",
        batchId: data.batchIds[0], // Primary batch ID
        userId: "current_user_id", // Replace with actual user ID
        previousEventId: null,
        payloadUrl: `/api/payload/evt_${Date.now()}`,
        payloadHash: `hash_${Date.now()}`,
        metadata: {
          formulationType: data.formulationType,
          ingredients: data.ingredients,
          batchSize: data.batchSize,
          expiryDate: data.expiryDate,
          notes: data.notes,
          sourceBatches: data.batchIds,
        },
        txId: `tx_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {} as User,
        documents: [],
      };
      resolve(newEvent);
    }, 500);
  });
}

// Compliance and Sustainability APIs
export async function getComplianceData(
  userId?: string,
  batchId?: string,
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCompliance = {
        overallScore: 96.5,
        categories: {
          sustainability: {
            score: 98,
            details: {
              geoFencing: "Compliant",
              harvestQuotas: "Within limits",
              seasonalRestrictions: "Compliant",
              endangeredSpecies: "No violations",
            },
          },
          quality: {
            score: 95,
            details: {
              moistureContent: "Within range",
              pesticideResidues: "Below limits",
              heavyMetals: "Compliant",
              microbialLoad: "Safe",
            },
          },
          documentation: {
            score: 97,
            details: {
              certificates: "Complete",
              permits: "Valid",
              chainOfCustody: "Documented",
              labReports: "Available",
            },
          },
          blockchain: {
            score: 96,
            details: {
              eventRecording: "Complete",
              smartContracts: "Executed",
              immutability: "Verified",
              transparency: "Full",
            },
          },
        },
        violations: [],
        recommendations: [
          "Consider implementing additional moisture monitoring",
          "Update harvesting permits before expiry",
        ],
        lastAudit: new Date("2024-01-15"),
        nextAudit: new Date("2024-04-15"),
      };
      resolve(mockCompliance);
    }, 200);
  });
}

export async function getSustainabilityMetrics(
  userId?: string,
  dateRange?: { start: Date; end: Date },
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockMetrics = {
        carbonFootprint: {
          total: 2.4, // kg CO2 equivalent
          breakdown: {
            transportation: 1.2,
            processing: 0.8,
            packaging: 0.4,
          },
        },
        waterUsage: {
          total: 150, // liters per kg
          efficiency: 92, // percentage
        },
        biodiversityImpact: {
          speciesProtected: 12,
          habitatPreserved: 45.6, // hectares
          endangeredSpeciesAvoided: 3,
        },
        socialImpact: {
          farmersSupported: 156,
          fairTradeCompliance: 98,
          communityBenefit: 85000, // INR
        },
        certifications: [
          {
            name: "Organic Certification",
            status: "Valid",
            expiry: "2024-12-31",
          },
          { name: "Fair Trade", status: "Valid", expiry: "2024-11-30" },
          { name: "Rainforest Alliance", status: "Pending", expiry: null },
        ],
      };
      resolve(mockMetrics);
    }, 200);
  });
}

// QR code and Consumer Engagement APIs
export async function generateQRCode(
  batchId: string,
): Promise<{ qrToken: string; qrUrl: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const qrToken = `QR_${batchId}_${Date.now()}`;
      const qrUrl = `https://verify.herbchain.com/batch/${batchId}?token=${qrToken}`;
      resolve({ qrToken, qrUrl });
    }, 300);
  });
}

export async function getConsumerEngagementData(
  batchId?: string,
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockEngagement = {
        totalScans: 1247,
        uniqueConsumers: 892,
        scansByLocation: [
          { city: "Mumbai", count: 324 },
          { city: "Delhi", count: 298 },
          { city: "Bangalore", count: 267 },
          { city: "Chennai", count: 189 },
          { city: "Kolkata", count: 169 },
        ],
        scansByDevice: [
          { device: "iPhone", count: 567 },
          { device: "Samsung", count: 423 },
          { device: "Google Pixel", count: 157 },
          { device: "OnePlus", count: 100 },
        ],
        scanTrends: [
          { date: "2024-01-15", scans: 45 },
          { date: "2024-01-16", scans: 52 },
          { date: "2024-01-17", scans: 38 },
          { date: "2024-01-18", scans: 61 },
          { date: "2024-01-19", scans: 47 },
        ],
        consumerFeedback: [
          {
            rating: 5,
            comment: "Excellent quality and transparency!",
            timestamp: new Date("2024-01-19"),
          },
          {
            rating: 4,
            comment: "Good product, love the traceability feature",
            timestamp: new Date("2024-01-18"),
          },
          {
            rating: 5,
            comment: "Trust this brand completely",
            timestamp: new Date("2024-01-17"),
          },
        ],
      };
      resolve(mockEngagement);
    }, 200);
  });
}

// Notification and Alert APIs
export async function getNotifications(userId: string): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockNotifications = [
        {
          id: "notif_001",
          type: "warning",
          title: "Harvesting Window Alert",
          message: "Optimal harvesting window for Ashwagandha closes in 3 days",
          timestamp: new Date("2024-01-20T09:00:00"),
          read: false,
          actionRequired: true,
        },
        {
          id: "notif_002",
          type: "success",
          title: "Quality Test Passed",
          message: "Batch QR_ASH_001_2024 has passed all quality tests",
          timestamp: new Date("2024-01-19T14:30:00"),
          read: false,
          actionRequired: false,
        },
        {
          id: "notif_003",
          type: "info",
          title: "New Compliance Update",
          message: "Updated AYUSH guidelines are now available",
          timestamp: new Date("2024-01-18T11:15:00"),
          read: true,
          actionRequired: false,
        },
        {
          id: "notif_004",
          type: "error",
          title: "Geo-fence Violation",
          message: "Collection attempted outside approved zone",
          timestamp: new Date("2024-01-17T16:45:00"),
          read: false,
          actionRequired: true,
        },
      ];
      resolve(mockNotifications);
    }, 100);
  });
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
}

// Inventory and Stock Management APIs
export async function getInventoryData(
  userId?: string,
  role?: string,
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockInventory = {
        totalStock: 2456, // kg
        stockBySpecies: [
          { species: "Ashwagandha", quantity: 567, unit: "kg", value: 125000 },
          { species: "Turmeric", quantity: 423, unit: "kg", value: 89000 },
          { species: "Brahmi", quantity: 234, unit: "kg", value: 156000 },
          { species: "Neem", quantity: 189, unit: "kg", value: 45000 },
        ],
        stockMovement: [
          {
            date: "2024-01-20",
            type: "IN",
            species: "Ashwagandha",
            quantity: 45,
            reason: "New harvest",
          },
          {
            date: "2024-01-19",
            type: "OUT",
            species: "Turmeric",
            quantity: 23,
            reason: "Shipped to manufacturer",
          },
          {
            date: "2024-01-18",
            type: "IN",
            species: "Brahmi",
            quantity: 67,
            reason: "Wild collection",
          },
        ],
        lowStockAlerts: [
          {
            species: "Neem",
            currentStock: 12,
            minimumLevel: 50,
            urgency: "high",
          },
        ],
        expiryAlerts: [
          {
            species: "Turmeric",
            batchId: "batch_005",
            expiryDate: "2024-02-15",
            daysRemaining: 26,
          },
        ],
      };
      resolve(mockInventory);
    }, 150);
  });
}

// Reporting and Export APIs
export async function generateReport(
  type: string,
  params: any,
): Promise<{ reportId: string; downloadUrl: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reportId = `report_${type}_${Date.now()}`;
      const downloadUrl = `/api/reports/${reportId}/download`;
      resolve({ reportId, downloadUrl });
    }, 2000); // Simulate longer processing time for report generation
  });
}

export async function getReportHistory(userId: string): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReports = [
        {
          id: "report_001",
          type: "compliance",
          title: "Monthly Compliance Report - January 2024",
          generatedAt: new Date("2024-01-31T10:00:00"),
          status: "completed",
          downloadUrl: "/api/reports/report_001/download",
        },
        {
          id: "report_002",
          type: "traceability",
          title: "Batch Traceability Report - QR_ASH_001_2024",
          generatedAt: new Date("2024-01-25T15:30:00"),
          status: "completed",
          downloadUrl: "/api/reports/report_002/download",
        },
        {
          id: "report_003",
          type: "quality",
          title: "Quality Analysis Summary - Q1 2024",
          generatedAt: new Date("2024-01-20T09:15:00"),
          status: "processing",
          downloadUrl: null,
        },
      ];
      resolve(mockReports);
    }, 100);
  });
}
