import type { CalendarDate as SeasonsCalendarDate } from '../seasons-and-stars/calendar.js';

export type TimeSpec = Date | number | RelativeTimeSpec | AbsoluteTimeSpec;

export interface ModuleMacroRegistration {
  moduleId: string;
  macroId?: string;
  macroCode?: string;
  name: string;
  description?: string;
}

export interface ModuleTaskScheduling {
  moduleId: string;
  macroId: string;
  schedule: TimeSpec;
  name: string;
  description?: string;
  recurring?: boolean;
  interval?: TimeSpec;
  scope?: 'world' | 'client';
}

export interface RelativeTimeSpec {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface AbsoluteTimeSpec {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  timeSpec: TimeSpec;
  targetTime: number;
  macroId: string;
  macroSource: 'generated' | 'existing' | 'module';
  owningModule?: string;
  useGameTime: boolean;
  recurring: boolean;
  interval?: TimeSpec;
  scope: 'world' | 'client';
  enabled: boolean;
  created: number;
  runCount: number;
  lastExecution?: number;
  lastError?: string;
  logExecution: boolean;
  calendarIntegrated?: boolean;
  calendarDate?: CalendarDate;
  uiConfigured?: boolean;
  isAccumulatedTime?: boolean;
  requiredTime?: number;
  accumulatedTime?: number;
  timeEntries?: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  timestamp: number;
  duration: number;
  description?: string;
  loggedBy?: string;
}

export interface TaskExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  timeout?: boolean;
  executionTime: number;
  timestamp: number;
}

export interface TaskError {
  taskId: string;
  error: Error;
  timestamp: number;
  retryCount: number;
}

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export interface TaskStorageData {
  tasks: Task[];
  scope: 'world' | 'client';
  version: string;
  lastUpdated: number;
}

export interface TaskTriggerSettings {
  enableLogging: boolean;
  logJournalName: string;
  securityWarnings: boolean;
  calendarIntegration: boolean;
}

export interface ScheduleOptions {
  scope?: 'world' | 'client';
  name?: string;
  description?: string;
  logExecution?: boolean;
  enabled?: boolean;
}

export interface TaskInfo {
  id: string;
  name: string;
  description?: string;
  nextExecution: number;
  isRecurring: boolean;
  enabled: boolean;
  runCount: number;
  lastExecution?: number;
  lastError?: string;
  useGameTime: boolean;
  scope: 'world' | 'client';
}

export interface AccumulatedTimeTaskOptions {
  name: string;
  description?: string;
  requiredTime: TimeSpec;
  macroId: string;
  scope?: 'world' | 'client';
  logExecution?: boolean;
}

export interface TimeLogEntry {
  duration: TimeSpec;
  description?: string;
}

export interface TaskTriggerAPI {
  setTimeout(delay: TimeSpec, macroId: string, options?: ScheduleOptions): Promise<string>;
  setInterval(interval: TimeSpec, macroId: string, options?: ScheduleOptions): Promise<string>;
  clearTimeout(taskId: string): Promise<boolean>;
  clearInterval(taskId: string): Promise<boolean>;
  setGameTimeout(delay: TimeSpec, macroId: string, options?: ScheduleOptions): Promise<string>;
  setGameInterval(interval: TimeSpec, macroId: string, options?: ScheduleOptions): Promise<string>;
  scheduleAt(dateTime: Date, macroId: string, options?: ScheduleOptions): Promise<string>;
  scheduleForDate(
    calendarDate: CalendarDate | SeasonsCalendarDate,
    macroId: string,
    options?: ScheduleOptions
  ): Promise<string>;
  scheduleReminder(delay: TimeSpec, message: string, options?: ScheduleOptions): Promise<string>;
  scheduleRecurringReminder(
    interval: TimeSpec,
    message: string,
    options?: ScheduleOptions
  ): Promise<string>;
  scheduleGameReminder(
    delay: TimeSpec,
    message: string,
    options?: ScheduleOptions
  ): Promise<string>;
  cancel(taskId: string): Promise<boolean>;
  enable(taskId: string): Promise<void>;
  disable(taskId: string): Promise<void>;
  getTaskInfo(taskId: string): Promise<TaskInfo | null>;
  listTasks(scope?: 'world' | 'client'): Promise<TaskInfo[]>;
  listTasksForDate(calendarDate: CalendarDate): Promise<TaskInfo[]>;
  getStatistics(): Promise<Record<string, unknown>>;
  formatTimeSpec(timeSpec: TimeSpec, useGameTime?: boolean): string;
  getNextExecutionTime(taskId: string): Promise<string | null>;
  isReady(): boolean;
  createAccumulatedTimeTask(options: AccumulatedTimeTaskOptions): Promise<string>;
  addTimeToTask(taskId: string, entry: TimeLogEntry): Promise<boolean>;
  getAccumulatedTimeProgress(taskId: string): Promise<unknown>;
  listAccumulatedTimeTasks(scope?: 'world' | 'client'): Promise<Task[]>;
  removeTimeEntry(taskId: string, entryId: string): Promise<boolean>;
  editTimeEntry(
    taskId: string,
    entryId: string,
    newDuration: TimeSpec,
    newDescription?: string
  ): Promise<boolean>;
  getAccumulatedTimeStatistics(taskId: string): Promise<unknown>;
  exportTaskTimeLog(taskId: string, format?: 'json' | 'csv'): Promise<string>;
  showTaskManager(): void;
  markAsUITask(taskId: string): Promise<void>;
  markAsEphemeral(taskId: string): Promise<void>;
  cleanupOldTasks(olderThanDays?: number): Promise<number>;
}

declare global {
  interface Game {
    taskTrigger?: {
      api?: TaskTriggerAPI;
    };
  }
}

export {};
