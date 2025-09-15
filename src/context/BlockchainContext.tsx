import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateId } from '../utils/helpers';

export interface CollectionEvent {
  id: string;
  timestamp: string;
  collectorId: string;
  collectorName: string;
  species: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  quantity: number;
  qualityMetrics: {
    moisture: number;
    purity: number;
    maturity: string;
  };
  sustainabilityScore: number;
  blockHash: string;
  validated: boolean;
}

export interface QualityTest {
  id: string;
  timestamp: string;
  labId: string;
  labName: string;
  collectionEventId: string;
  testResults: {
    moisture: number;
    pesticideLevel: number;
    dnaAuthenticity: boolean;
    heavyMetals: number;
    microbialLoad: number;
  };
  certification: string;
  blockHash: string;
  validated: boolean;
}

export interface ProcessingStep {
  id: string;
  timestamp: string;
  processorId: string;
  processorName: string;
  step: string;
  conditions: {
    temperature: number;
    humidity: number;
    duration: number;
  };
  inputBatch: string;
  outputBatch: string;
  blockHash: string;
  validated: boolean;
}

export interface Product {
  id: string;
  qrCode: string;
  batchId: string;
  productName: string;
  manufacturer: string;
  collectionEvents: CollectionEvent[];
  qualityTests: QualityTest[];
  processingSteps: ProcessingStep[];
  finalQuality: {
    overallScore: number;
    certifications: string[];
  };
  createdAt: string;
  blockHash: string;
}

interface BlockchainContextType {
  products: Product[];
  collections: CollectionEvent[];
  qualityTests: QualityTest[];
  processingSteps: ProcessingStep[];
  addCollectionEvent: (event: Omit<CollectionEvent, 'id' | 'blockHash' | 'validated'>) => string;
  addQualityTest: (test: Omit<QualityTest, 'id' | 'blockHash' | 'validated'>) => string;
  addProcessingStep: (step: Omit<ProcessingStep, 'id' | 'blockHash' | 'validated'>) => string;
  createProduct: (product: Omit<Product, 'id' | 'qrCode' | 'blockHash'>) => string;
  getProductById: (id: string) => Product | undefined;
  getProductByQR: (qrCode: string) => Product | undefined;
  validateSmartContract: (data: any) => boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionEvent[]>([]);
  const [qualityTests, setQualityTests] = useState<QualityTest[]>([]);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);

  const generateBlockHash = (data: any): string => {
    // Simple mock hash generation
    return btoa(JSON.stringify(data) + Date.now()).slice(0, 16);
  };

  const validateSmartContract = (data: any): boolean => {
    // Mock smart contract validation
    if (data.location) {
      // Geo-fencing validation (example: only allow collections from approved regions)
      const { latitude, longitude } = data.location;
      if (latitude < 8 || latitude > 37 || longitude < 68 || longitude > 97) {
        return false; // Outside India bounds
      }
    }
    
    // Seasonal validation (example: some herbs only in winter)
    const month = new Date(data.timestamp).getMonth();
    if (data.species === 'Ashwagandha' && (month < 10 || month > 2)) {
      return false; // Winter harvest only
    }

    return true;
  };

  const addCollectionEvent = (eventData: Omit<CollectionEvent, 'id' | 'blockHash' | 'validated'>): string => {
    const id = generateId();
    const validated = validateSmartContract(eventData);
    const blockHash = generateBlockHash({ ...eventData, id });
    
    const event: CollectionEvent = {
      ...eventData,
      id,
      blockHash,
      validated,
    };

    setCollections(prev => [...prev, event]);
    return id;
  };

  const addQualityTest = (testData: Omit<QualityTest, 'id' | 'blockHash' | 'validated'>): string => {
    const id = generateId();
    const validated = validateSmartContract(testData);
    const blockHash = generateBlockHash({ ...testData, id });
    
    const test: QualityTest = {
      ...testData,
      id,
      blockHash,
      validated,
    };

    setQualityTests(prev => [...prev, test]);
    return id;
  };

  const addProcessingStep = (stepData: Omit<ProcessingStep, 'id' | 'blockHash' | 'validated'>): string => {
    const id = generateId();
    const validated = validateSmartContract(stepData);
    const blockHash = generateBlockHash({ ...stepData, id });
    
    const step: ProcessingStep = {
      ...stepData,
      id,
      blockHash,
      validated,
    };

    setProcessingSteps(prev => [...prev, step]);
    return id;
  };

  const createProduct = (productData: Omit<Product, 'id' | 'qrCode' | 'blockHash'>): string => {
    const id = generateId();
    const qrCode = `QR${id.slice(0, 8).toUpperCase()}`;
    const blockHash = generateBlockHash({ ...productData, id, qrCode });
    
    const product: Product = {
      ...productData,
      id,
      qrCode,
      blockHash,
    };

    setProducts(prev => [...prev, product]);
    return id;
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductByQR = (qrCode: string): Product | undefined => {
    return products.find(p => p.qrCode === qrCode);
  };

  return (
    <BlockchainContext.Provider value={{
      products,
      collections,
      qualityTests,
      processingSteps,
      addCollectionEvent,
      addQualityTest,
      addProcessingStep,
      createProduct,
      getProductById,
      getProductByQR,
      validateSmartContract,
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};
