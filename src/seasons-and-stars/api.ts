import type { JournalEntry } from '../foundry/index.js';
import type {
  CalendarDate,
  CalendarIntercalary,
  DateFormatOptions,
  SeasonsStarsCalendar
} from './calendar.js';
import type {
  CalendarCollection,
  CalendarCollectionEntry,
  ExternalCalendarSource,
  LoadResult
} from './calendar-loader.js';

export interface SeasonsStarsAPI {
  getCurrentDate(): CalendarDate | null;
  setCurrentDate(date: CalendarDate): Promise<boolean>;
  advanceTime(amount: number, unit: string): Promise<void>;
  advanceDays(days: number, calendarId?: string): Promise<void>;
  advanceHours(hours: number, calendarId?: string): Promise<void>;
  advanceMinutes(minutes: number, calendarId?: string): Promise<void>;
  advanceWeeks(weeks: number, calendarId?: string): Promise<void>;
  advanceMonths(months: number, calendarId?: string): Promise<void>;
  advanceYears(years: number, calendarId?: string): Promise<void>;
  getActiveCalendar(): SeasonsStarsCalendar | null;
  setActiveCalendar(calendarId: string): Promise<void>;
  getAvailableCalendars(): string[];
  loadCalendar(data: SeasonsStarsCalendar): void;
  getMonthNames(calendarId?: string): string[];
  getWeekdayNames(calendarId?: string): string[];
  getSeasonInfo(date: CalendarDate, calendarId?: string): { name: string; icon: string };
  getSunriseSunset(date: CalendarDate, calendarId?: string): { sunrise: number; sunset: number };
  formatDate(date: CalendarDate, options?: DateFormatOptions): string;
  dateToWorldTime(date: CalendarDate, calendarId?: string): number;
  worldTimeToDate(timestamp: number, calendarId?: string): CalendarDate;
  loadCalendarFromUrl(
    url: string,
    options?: { validate?: boolean; cache?: boolean }
  ): Promise<LoadResult>;
  loadCalendarCollection(
    url: string,
    options?: { validate?: boolean; cache?: boolean }
  ): Promise<LoadResult[]>;
  addExternalSource(source: {
    name: string;
    url: string;
    enabled: boolean;
    type: 'calendar' | 'collection' | 'variants';
  }): string;
  removeExternalSource(sourceId: string): boolean;
  getExternalSources(): ExternalCalendarSource[];
  getExternalSource(sourceId: string): ExternalCalendarSource | undefined;
  refreshExternalCalendar(sourceId: string): Promise<LoadResult>;
  refreshAllExternalCalendars(): Promise<Record<string, LoadResult>>;
  clearExternalCalendarCache(): void;
  loadModuleCalendars(moduleId: string): Promise<LoadResult[]>;
  exportCalendars?(): CalendarCollection;
  registerCalendarCollection?(collection: CalendarCollection): void;
  getCalendarCollection?(collectionId: string): CalendarCollection | undefined;
  deleteExternalCalendar?(sourceId: string): Promise<boolean>;
}

export interface CalendarManagerInterface {
  getCurrentDate(): CalendarDate | null;
  setCurrentDate(date: CalendarDate): Promise<void>;
  getActiveCalendar(): SeasonsStarsCalendar | null;
  getActiveEngine(): CalendarEngineInterface | null;
  getAllCalendars(): SeasonsStarsCalendar[];
  getCalendar(calendarId: string): SeasonsStarsCalendar | null;
  getAvailableCalendars(): SeasonsStarsCalendar[];
  setActiveCalendar(calendarId: string): Promise<boolean>;
  advanceSeconds(seconds: number): Promise<void>;
  advanceMinutes(minutes: number): Promise<void>;
  advanceHours(hours: number): Promise<void>;
  advanceDays(days: number): Promise<void>;
  advanceWeeks(weeks: number): Promise<void>;
  advanceMonths(months: number): Promise<void>;
  advanceYears(years: number): Promise<void>;
}

export interface CalendarEngineInterface {
  getCalendar(): SeasonsStarsCalendar;
  calculateWeekday(year: number, month: number, day: number): number;
  getMonthLength(month: number, year: number): number;
  dateToWorldTime(date: CalendarDate, worldCreationTimestamp?: number): number;
  worldTimeToDate(timestamp: number, worldCreationTimestamp?: number): CalendarDate;
  getIntercalaryDaysAfterMonth(month: number, year: number): CalendarIntercalary[];
  addMonths(date: CalendarDate, months: number): CalendarDate;
  addYears(date: CalendarDate, years: number): CalendarDate;
}

export interface NotesManagerInterface {
  createNote(data: unknown): Promise<JournalEntry>;
  updateNote(noteId: string, data: unknown): Promise<JournalEntry>;
  deleteNote(noteId: string): Promise<void>;
  getNote(noteId: string): Promise<JournalEntry | null>;
  getNotesForDate(date: CalendarDate): Promise<JournalEntry[]>;
  getNotesForDateRange(start: CalendarDate, end: CalendarDate): Promise<JournalEntry[]>;
  setNoteModuleData(noteId: string, moduleId: string, data: unknown): Promise<void>;
  getNoteModuleData(noteId: string, moduleId: string): unknown;
  canCreateNote(): boolean;
  storage: {
    findNotesByDateSync(date: CalendarDate): JournalEntry[];
    removeNote(noteId: string): Promise<void>;
    getAllNotes?(): JournalEntry[];
  };
}

export interface CalendarModuleApi {
  version?: string;
  active?: boolean;
  api?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface FoundryModuleData {
  id: string;
  api?: CalendarModuleApi;
  active: boolean;
  [key: string]: unknown;
}

export interface CalendarCollectionManager {
  listCollections(): CalendarCollectionEntry[];
  getCollection(id: string): CalendarCollection | undefined;
  registerCollection(collection: CalendarCollection): void;
}

export function isCalendarManager(obj: unknown): obj is CalendarManagerInterface {
  return typeof obj === 'object' && obj !== null && 'getCurrentDate' in obj;
}

export function isNotesManager(obj: unknown): obj is NotesManagerInterface {
  return typeof obj === 'object' && obj !== null && 'createNote' in obj;
}
