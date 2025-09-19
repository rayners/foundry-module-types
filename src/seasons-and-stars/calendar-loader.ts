import type { SeasonsStarsCalendar } from './calendar.js';

export interface LoaderOptions {
  timeout?: number;
  validate?: boolean;
  headers?: Record<string, string>;
}

export interface LoadResult {
  success: boolean;
  calendar?: SeasonsStarsCalendar;
  validation?: ValidationResult;
  error?: string;
  sourceUrl?: string;
  collectionEntry?: CalendarCollectionEntry;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface ExternalCalendarSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  lastLoaded?: number;
  lastError?: string;
  type: 'calendar' | 'collection' | 'variants';
}

export interface CalendarCollectionEntry {
  id: string;
  name: string;
  description?: string;
  file?: string;
  url?: string;
  preview?: string;
  tags?: string[];
  author?: string;
  version?: string;
  metadata?: Record<string, unknown>;
}

export interface CalendarCollection {
  name: string;
  description?: string;
  version?: string;
  calendars: CalendarCollectionEntry[];
  metadata?: Record<string, unknown>;
}
