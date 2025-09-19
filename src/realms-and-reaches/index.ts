import type { RegionDocument } from '../foundry/index.js';

export interface RealmMetadata {
  created: string;
  modified: string;
  author: string;
}

export interface RealmFlags {
  isRealm?: boolean;
  tags?: string[];
  metadata?: RealmMetadata;
}

export type RealmRegion = RegionDocument & {
  flags: RegionDocument['flags'] & {
    'realms-and-reaches'?: RealmFlags;
  };
  bounds?: { x: number; y: number; width: number; height: number };
};

export interface RealmGeometry {
  type: 'circle' | 'rectangle' | 'polygon';
  x?: number;
  y?: number;
  radius?: number;
  width?: number;
  height?: number;
  rotation?: number;
  points?: number[];
}

export interface RealmCreationData {
  name?: string;
  shapes?: any[];
  geometry?: RealmGeometry;
  tags?: string[];
  color?: string;
  id?: string;
}

export interface RealmUpdateData {
  name?: string;
  shapes?: any[];
  tags?: string[];
  color?: string;
}

export interface RealmQueryOptions {
  sceneId?: string;
  tags?: string[];
  bounds?: { x: number; y: number; width: number; height: number };
  limit?: number;
}

export interface RealmExportData {
  format: string;
  metadata: Record<string, unknown>;
  realms: {
    id: string;
    name: string;
    color?: string;
    shapes?: any[];
    tags: string[];
    metadata: RealmMetadata;
  }[];
  bounds?: { width: number; height: number } | null;
}

export interface RealmManager {
  createRealm(realmData: RealmCreationData): Promise<RealmRegion>;
  updateRealm(realm: RealmRegion, updates?: RealmUpdateData): Promise<void>;
  deleteRealm(realmId: string): Promise<boolean>;
  getRealm(realmId: string): RealmRegion | null;
  getRealmAt(x: number, y: number): RealmRegion | null;
  getRealmsAt(x: number, y: number): RealmRegion[];
  getAllRealms(): RealmRegion[];
  findRealms(options: RealmQueryOptions): RealmRegion[];
  findRealmsByTag(tag: string): RealmRegion[];
  findRealmsByTags(tags: string[]): RealmRegion[];
  exportData(): RealmExportData;
  importData(data: RealmExportData, options?: { replace?: boolean; merge?: boolean }): Promise<number>;
  loadFromScene(): Promise<void>;
  saveToScene(): Promise<void>;
}

export interface TagSuggestion {
  tag: string;
  usageCount?: number;
}

export interface TagSystem {
  getSuggestions(namespace: string, excludeTags?: string[]): TagSuggestion[];
  validateTag(tag: string): { valid: boolean; error?: string };
}

export interface RealmsAndReachesAPI {
  getRealmAt(x: number, y: number): RealmRegion | null;
  getAllRealms(): RealmRegion[];
  getRealmsByTag(tag: string): RealmRegion[];
  getRealmsByTagKey(key: string): RealmRegion[];
  getTagSuggestions(namespace: string, excludeTags?: string[]): string[];
  validateTag(tag: string): boolean;
  createRealm(realmData: RealmCreationData): Promise<RealmRegion>;
  updateRealm(realmId: string, updates: RealmUpdateData): Promise<RealmRegion | null>;
  deleteRealm(realmId: string): Promise<boolean>;
  exportScene(): RealmExportData;
  importScene(data: RealmExportData): Promise<void>;
  getManager(): RealmManager;
}

declare global {
  interface Game {
    realmsAndReaches?: {
      api?: RealmsAndReachesAPI;
    };
  }
}

export {};
