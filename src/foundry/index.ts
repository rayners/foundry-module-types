export interface Collection<T> extends Iterable<T> {
  readonly size?: number;
  get(id: string): T | undefined;
  has(id: string): boolean;
  find(predicate: (item: T) => boolean): T | undefined;
  filter(predicate: (item: T) => boolean): T[];
  map<U>(mapper: (item: T) => U): U[];
  [Symbol.iterator](): Iterator<T>;
  contents?: T[];
}

export interface Localization {
  localize(key: string): string;
  format(key: string, data: Record<string, unknown>): string;
  has?(key: string): boolean;
  lang?: string;
  translations?: Record<string, unknown>;
}

export interface ModuleAuthor {
  name?: string;
  github?: string;
  email?: string;
  discord?: string;
  url?: string;
}

export interface ModuleData<TApi = unknown> {
  id: string;
  title?: string;
  version?: string;
  active: boolean;
  api?: TApi;
  author?: string;
  authors?: (ModuleAuthor | string)[] | Set<ModuleAuthor | string>;
  [key: string]: unknown;
}

export interface GameSystem {
  id: string;
  title?: string;
  version?: string;
  data?: unknown;
  template?: unknown;
  model?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface User {
  id: string;
  name?: string;
  isGM?: boolean;
  [key: string]: unknown;
}

export interface ActorSheet {
  rendered?: boolean;
  [key: string]: unknown;
}

export interface Item {
  id?: string;
  name?: string;
  type?: string;
  system?: Record<string, unknown>;
  update?(data: Record<string, unknown>): Promise<Item>;
  [key: string]: unknown;
}

export interface Actor {
  id?: string;
  uuid?: string;
  name?: string;
  type?: string;
  system?: Record<string, unknown>;
  sheet?: ActorSheet | null;
  items: Collection<Item> | Item[];
  getSkill?(skillName: string): Item | null | undefined;
  rollSkill?(skillName: string, options?: Record<string, unknown>): Promise<unknown>;
  rollAbility?(abilityName: string, options?: Record<string, unknown>): Promise<unknown>;
  createEmbeddedDocuments?(
    documentName: string,
    data: Record<string, unknown>[],
    context?: Record<string, unknown>
  ): Promise<unknown[]>;
  getCharacters?(): Actor[];
  setCharacterStatus?(characterId: string, status: string): Promise<void>;
  addOwnCharacter?(characterId: string): Promise<void>;
  removeOwnCharacter?(characterId: string): Promise<void>;
  addCharacter?(characterId: string): Promise<void>;
  removeCharacter?(characterId: string): Promise<void>;
  assignTravelRole?(role: string, characterId: string): Promise<void>;
  addResource?(resource: string, amount: number): Promise<void>;
  removeResource?(resource: string, amount: number): Promise<void>;
  [key: string]: unknown;
}

export interface ChatMessage {
  id?: string;
  content: string;
  speaker?: Record<string, unknown>;
  flags?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ClientSettings {
  register(module: string, key: string, options: SettingConfig): void;
  registerMenu(module: string, key: string, options: SettingMenuConfig): void;
  get(module: string, key: string): unknown;
  set(module: string, key: string, value: unknown): Promise<unknown>;
}

export interface SettingConfig {
  name?: string;
  hint?: string;
  scope: 'world' | 'client';
  config: boolean;
  type: unknown;
  default?: unknown;
  choices?: Record<string, string>;
  range?: {
    min: number;
    max: number;
    step: number;
  };
  onChange?: (value: unknown) => void | Promise<void>;
  [key: string]: unknown;
}

export interface SettingMenuConfig {
  name: string;
  label: string;
  hint?: string;
  icon?: string;
  type: new (...args: any[]) => FormApplication | ApplicationV2;
  restricted?: boolean;
}

export interface CompendiumMetadata {
  id: string;
  label: string;
  package: string;
  type: string;
  [key: string]: unknown;
}

export interface CompendiumCollection<T = unknown> {
  documentName: string;
  metadata: CompendiumMetadata;
  getDocuments(): Promise<T[]>;
  getIndex?(): Promise<any>;
  [key: string]: unknown;
}

export interface BaseDocument {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface JournalEntry extends BaseDocument {
  content?: string;
  folder?: string;
  sort?: number;
  ownership?: Record<string, number>;
  flags?: Record<string, Record<string, unknown>>;
}

export interface RegionShape {
  type: string;
  [key: string]: unknown;
}

export interface RegionDocument extends BaseDocument {
  flags: Record<string, any>;
  shapes?: RegionShape[];
  bounds?: { x: number; y: number; width: number; height: number };
  testPoint(point: { x: number; y: number }, tolerance?: number): boolean;
  setFlag(scope: string, key: string, value: unknown): Promise<unknown>;
  unsetFlag?(scope: string, key: string): Promise<unknown>;
  update?(data: Record<string, unknown>): Promise<RegionDocument>;
  delete?(): Promise<void>;
  [key: string]: unknown;
}

export interface Scene extends BaseDocument {
  regions: Collection<RegionDocument> & RegionDocument[];
  width?: number;
  height?: number;
  createEmbeddedDocuments?(type: string, data: Record<string, unknown>[]): Promise<unknown>;
  deleteEmbeddedDocuments?(type: string, ids: string[]): Promise<unknown>;
}

export interface HooksManager {
  on(hook: string, callback: HookCallback): number;
  once(hook: string, callback: HookCallback): number;
  off(hook: string, callback: HookCallback): void;
  call?(hook: string, ...args: unknown[]): unknown;
  callAll?(hook: string, ...args: unknown[]): unknown;
}

export type HookCallback = (...args: unknown[]) => void | boolean | Promise<void | boolean>;

export interface ApplicationV2 {
  element?: HTMLElement;
  position?: {
    top?: number;
    left?: number;
    width?: number | string;
    height?: number | string;
    scale?: number;
  };
  rendered?: boolean;
  render(force?: boolean): Promise<void>;
  close(options?: unknown): Promise<unknown>;
}

export interface FormApplication {
  render(force?: boolean): void;
  close(): void;
  getData(): unknown;
  activateListeners(html: unknown): void;
  _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}

export interface Game {
  ready?: boolean;
  version: string;
  modules: Collection<ModuleData> & ModuleData[];
  settings: ClientSettings;
  system: GameSystem;
  i18n: Localization;
  actors: Collection<Actor> & Actor[];
  packs: Collection<CompendiumCollection> & CompendiumCollection[];
  scenes?: Collection<Scene> & Scene[];
  users?: Collection<User> & User[];
  user?: User;
  userId?: string;
  [key: string]: unknown;
}

declare global {
  // Foundry exposes a lenient global game variable
  interface LenientGlobalVariableTypes {
    game: Game;
  }

  const game: Game;
  const Hooks: HooksManager;
}

export {};
