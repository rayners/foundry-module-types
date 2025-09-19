/**
 * Type definitions for Simple Calendar Compatibility Bridge
 */

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  weekday: number;
  time?: {
    hour: number;
    minute: number;
    second: number;
  };
}

export interface SimpleCalendarDate {
  year: number;
  month: number;
  day: number;
  dayOfTheWeek: number;
  hour: number;
  minute: number;
  second: number;
  dayOffset: number;
  sunrise: number;
  sunset: number;
  display: {
    date: string;
    time: string;
    weekday: string;
    day: string;
    monthName: string;
    month: string;
    year: string;
    daySuffix: string;
    yearPrefix: string;
    yearPostfix: string;
  };
  weekdays: string[];
  showWeekdayHeadings: boolean;
  currentSeason: {
    icon: string;
  };
}

export interface SimpleCalendarInterval {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export interface CalendarProvider {
  readonly name: string;
  readonly version: string;
  getCurrentDate(): CalendarDate | null;
  worldTimeToDate(timestamp: number): CalendarDate;
  dateToWorldTime(date: CalendarDate): number;
  formatDate(date: CalendarDate, options?: unknown): string;
  getActiveCalendar(): unknown;
  getMonthNames(): string[];
  getWeekdayNames(): string[];
  advanceDays?(days: number): Promise<void>;
  advanceHours?(hours: number): Promise<void>;
  advanceMinutes?(minutes: number): Promise<void>;
  getSunriseSunset?(date: CalendarDate): { sunrise: number; sunset: number };
  getSeasonInfo?(date: CalendarDate): { icon: string; name: string };
  getYearFormatting?(): { prefix: string; suffix: string };
}

export interface SimpleCalendarAPI {
  timestamp(): number;
  timestampToDate(timestamp: number): SimpleCalendarDate;
  timestampPlusInterval(timestamp: number, interval: unknown): number;
  getCurrentDate(): SimpleCalendarDate;
  formatDateTime(date: unknown, format?: string): string;
  dateToTimestamp(date: unknown): number;
  advanceDays(days: number): Promise<void>;
  addMonths(date: unknown, months: number): unknown;
  addYears(date: unknown, years: number): unknown;
  setTime(time: number): Promise<void>;
  addSidebarButton(
    name: string,
    icon: string,
    tooltip: string,
    isToggle: boolean,
    callback: (...args: unknown[]) => unknown
  ): void;
  getNotesForDay(year: number, month: number, day: number): unknown[];
  addNote(
    title: string,
    content: string,
    startDate: unknown,
    endDate: unknown,
    allDay: boolean
  ): Promise<unknown>;
  removeNote(noteId: string): Promise<void>;
  clockStatus(): { started: boolean };
  startClock(): void;
  stopClock(): void;
  showCalendar(): void;
  getAllMoons(): unknown[];
  getAllSeasons(): unknown[];
}

export interface SimpleCalendarHooks {
  Init: string;
  DateTimeChange: string;
  ClockStartStop: string;
}

declare global {
  interface Window {
    SimpleCalendar?: {
      api: SimpleCalendarAPI;
      Hooks: SimpleCalendarHooks;
    };
  }
}

export {};
