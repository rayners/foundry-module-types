import type {
  CalendarManagerInterface,
  NotesManagerInterface,
  SeasonsStarsAPI
} from './api.js';
import type { SeasonsStarsIntegrationAPI } from './integrations.js';

declare global {
  interface Game {
    seasonsStars?: {
      api?: SeasonsStarsAPI;
      manager?: CalendarManagerInterface;
      notes?: NotesManagerInterface;
      integration?: SeasonsStarsIntegrationAPI | null;
      compatibilityManager?: unknown;
      resetSeasonsWarningState?: () => void;
      getSeasonsWarningState?: () => boolean;
      setSeasonsWarningState?: (warned: boolean) => void;
    };
  }

  interface Window {
    SeasonsStars?: {
      api?: SeasonsStarsAPI;
      manager?: CalendarManagerInterface;
      notes?: NotesManagerInterface;
      integration?: SeasonsStarsIntegrationAPI | null;
      CalendarWidget?: unknown;
      CalendarMiniWidget?: unknown;
      CalendarGridWidget?: unknown;
      CalendarSelectionDialog?: unknown;
      NoteEditingDialog?: unknown;
      [key: string]: unknown;
    };
  }
}

export {};
