/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type { ErrorsAndEchoesAPI } from '../errors-and-echoes/index.js';
import type {
  CalendarDate as SimpleCalendarDate,
  SimpleCalendarAPI
} from '../simple-calendar-compat/index.js';

export interface ErrorsAndEchoesConfig {
  moduleId: string;
  contextProvider?: () => Record<string, unknown>;
  formatStackTrace?: (error: Error) => string[];
  submitError?: (error: Error, context: Record<string, unknown>) => Promise<void>;
  errorFilter?: (error: Error) => boolean;
}

export interface AboutTimeAPI {
  DTMod: {
    addTime(seconds: number): void;
    setTime(timestamp: number): void;
    getTimeString(): string;
    isGM(): boolean;
  };
}

export interface SmallTimeAPI {
  isRunning: boolean;
  increment: number;
  _updateDisplay(): void;
  setPos(): void;
}

export interface ModuleAPI {
  version?: string;
  active?: boolean;
  api?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface FoundryModule {
  id: string;
  api?: ModuleAPI;
  active: boolean;
  [key: string]: unknown;
}

export type CallbackFunction = (...args: unknown[]) => unknown;
export type EventHandler = (event: Event, ...args: unknown[]) => void;
export type HookCallback = (...args: unknown[]) => void | boolean | Promise<void | boolean>;

export interface DocumentData {
  _id: string;
  [key: string]: unknown;
}

export interface JournalEntryData extends DocumentData {
  name: string;
  content?: string;
  folder?: string;
  sort?: number;
  ownership?: Record<string, number>;
  flags?: Record<string, Record<string, unknown>>;
}

export interface SceneConfigRenderData {
  object: unknown;
  html: HTMLElement;
  data: Record<string, unknown>;
}

export interface HandlebarsContext {
  [key: string]: unknown;
}

export interface ModuleSettings {
  [key: string]: unknown;
}

export interface SettingsConfig {
  name: string;
  hint?: string;
  scope: 'world' | 'client';
  config: boolean;
  type: typeof String | typeof Number | typeof Boolean | typeof Object;
  default?: unknown;
  choices?: Record<string, string>;
  range?: {
    min: number;
    max: number;
    step: number;
  };
  onChange?: (value: unknown) => void;
}

export interface TimeOfDay {
  sunrise: number;
  sunset: number;
  hour?: number;
  minute?: number;
}

export interface SeasonInfo {
  name: string;
  icon?: string;
  color?: string;
  description?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  startDate: SimpleCalendarDate;
  endDate?: SimpleCalendarDate;
  allDay?: boolean;
  playerVisible?: boolean;
  calendarId?: string;
  category?: string;
  tags?: string[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: SimpleCalendarDate;
  };
}

export interface WidgetPosition {
  left: number;
  top: number;
  width?: number;
  height?: number;
}

export interface WidgetConfig {
  position: WidgetPosition;
  visible: boolean;
  [key: string]: unknown;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface MemoryReport {
  estimatedMB: number;
  details: Record<string, unknown>;
}

export interface MemoryMageAPI {
  registerModule(moduleId: string, callback: () => MemoryReport): void;
  registerCleanupHandler?(callback: () => void): void;
  report?: MemoryReport;
  hasConsent?: () => boolean;
  getPrivacyLevel?: () => string;
  getStats?: () => Record<string, unknown>;
}

export interface PerformanceOptimizer {
  getMemoryUsage(): number;
  getMetrics(): {
    totalNotes?: number;
    cacheHitRate?: number;
  };
  relieveMemoryPressure?(): void;
}

export interface ExtendedNotesManager {
  getPerformanceOptimizer?(): PerformanceOptimizer;
}

export interface ExtendedCalendarManager {
  getLoadedCalendars?(): unknown[];
  clearCaches?(): void;
}

export interface RecurringCalendarEngine {
  getCalendar(): unknown;
  calculateWeekday(year: number, month: number, day: number): number;
  getMonthLength(month: number, year: number): number;
  dateToWorldTime(date: SimpleCalendarDate): number;
  worldTimeToDate(timestamp: number): SimpleCalendarDate;
}

export interface SeasonsStarsIntegrationAPI {
  errorsAndEchoes?: ErrorsAndEchoesAPI;
  simpleCalendar?: SimpleCalendarAPI;
  aboutTime?: AboutTimeAPI;
  smallTime?: SmallTimeAPI;
  memoryMage?: MemoryMageAPI;
}

export type { CalendarProvider } from '../simple-calendar-compat/index.js';
