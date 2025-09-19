/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

/**
 * Seasons & Stars Calendar Type Definitions
 */

export interface SeasonsStarsCalendar {
  id: string;
  name?: string;
  label?: string;
  description?: string;
  translations: {
    [languageCode: string]: {
      label: string;
      description?: string;
      setting?: string;
    };
  };
  worldTime?: {
    interpretation: 'epoch-based' | 'real-time-based';
    epochYear: number;
    currentYear: number;
  };
  year: {
    epoch: number;
    currentYear: number;
    prefix: string;
    suffix: string;
    startDay: number;
  };
  leapYear: {
    rule: 'none' | 'gregorian' | 'custom';
    interval?: number;
    month?: string;
    extraDays?: number;
  };
  months: CalendarMonth[];
  weekdays: CalendarWeekday[];
  intercalary: CalendarIntercalary[];
  seasons?: CalendarSeason[];
  moons?: CalendarMoon[];
  canonicalHours?: CalendarCanonicalHour[];
  time: {
    hoursInDay: number;
    minutesInHour: number;
    secondsInMinute: number;
  };
  dateFormats?: CalendarDateFormats;
  variants?: Record<string, CalendarVariant>;
  sourceInfo?: CalendarSourceInfo;
}

export interface CalendarDateFormats {
  [formatName: string]: string | CalendarDateFormatVariants | undefined;
  widgets?: {
    mini?: string;
    main?: string;
    grid?: string;
  };
}

export interface CalendarDateFormatVariants {
  [variantName: string]: string;
}

export interface CalendarMonth {
  id?: string;
  name: string;
  abbreviation?: string;
  days: number;
  description?: string;
  translations?: Record<string, { description?: string }>;
}

export interface CalendarWeekday {
  id?: string;
  name: string;
  abbreviation?: string;
  description?: string;
  translations?: Record<string, { description?: string }>;
}

export type CalendarIntercalary = {
  name: string;
  days?: number;
  leapYearOnly: boolean;
  countsForWeekdays?: boolean;
  description?: string;
  translations?: Record<string, { description?: string }>;
} & ({ after: string; before?: never } | { before: string; after?: never });

export interface CalendarSeason {
  name: string;
  description?: string;
  startMonth: number;
  startDay?: number;
  endMonth?: number;
  icon?: string;
  color?: string;
  translations?: Record<string, { description?: string }>;
}

export interface CalendarMoon {
  name: string;
  cycleLength: number;
  firstNewMoon: MoonReferenceDate;
  phases: MoonPhase[];
  color?: string;
  translations?: Record<string, { description?: string }>;
}

export interface MoonReferenceDate {
  year: number;
  month: number;
  day: number;
}

export interface MoonPhase {
  name: string;
  length: number;
  singleDay: boolean;
  icon: string;
  translations?: Record<string, { name?: string }>;
}

export interface MoonPhaseInfo {
  moon: CalendarMoon;
  phase: MoonPhase;
  phaseIndex: number;
  dayInPhase: number;
  daysUntilNext: number;
}

export interface CalendarCanonicalHour {
  name: string;
  startHour: number;
  endHour: number;
  startMinute?: number;
  endMinute?: number;
  description?: string;
}

export interface CalendarDateData {
  year: number;
  month: number;
  day: number;
  weekday: number;
  intercalary?: string;
  time?: {
    hour: number;
    minute: number;
    second: number;
  };
}

export interface CalendarDate extends CalendarDateData {
  toObject(): CalendarDateData;
  toShortString(): string;
  toLongString(): string;
  toDateString(): string;
  toTimeString(): string;
  countsForWeekdays(): boolean;
}

export interface CalendarCalculation {
  totalDays: number;
  weekdayIndex: number;
  yearLength: number;
  monthLengths: number[];
  intercalaryDays: CalendarIntercalary[];
}

export interface DateFormatOptions {
  includeTime?: boolean;
  includeWeekday?: boolean;
  includeYear?: boolean;
  format?: 'short' | 'long' | 'numeric';
}

export interface CalendarVariant {
  name: string;
  description: string;
  default?: boolean;
  config?: {
    yearOffset?: number;
    [key: string]: unknown;
  };
  overrides?: {
    year?: Partial<SeasonsStarsCalendar['year']>;
    months?: Record<string, Partial<CalendarMonth>>;
    weekdays?: Record<string, Partial<CalendarWeekday>>;
    moons?: CalendarMoon[];
    canonicalHours?: CalendarCanonicalHour[];
    dateFormats?: CalendarDateFormats;
    [key: string]: unknown;
  };
}

export interface CalendarSourceInfo {
  type: 'builtin' | 'module' | 'external';
  sourceName: string;
  description: string;
  icon: string;
  moduleId?: string;
  externalSourceId?: string;
  url?: string;
}
