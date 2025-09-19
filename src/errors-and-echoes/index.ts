export interface ErrorsAndEchoesEndpoint {
  name: string;
  url: string;
  author?: string;
  modules?: string[];
  enabled: boolean;
}

export interface ErrorsAndEchoesRegistration {
  moduleId: string;
  contextProvider?: () => Record<string, unknown>;
  errorFilter?: (error: Error) => boolean;
  formatStackTrace?: (error: Error) => string[];
  submitError?: (error: Error, context: Record<string, unknown>) => Promise<void>;
  endpoint?: ErrorsAndEchoesEndpoint;
}

export interface ErrorsAndEchoesStats {
  totalReports: number;
  recentReports: number;
  lastReportTime?: string;
}

export interface ErrorsAndEchoesAPI {
  register(config: ErrorsAndEchoesRegistration): void;
  report(error: Error, options?: { module?: string; context?: Record<string, unknown> }): void;
  hasConsent(): boolean;
  getPrivacyLevel(): 'minimal' | 'standard' | 'detailed';
  getStats(): ErrorsAndEchoesStats;
}

declare global {
  interface Window {
    ErrorsAndEchoesAPI?: ErrorsAndEchoesAPI;
  }
}

export {};
