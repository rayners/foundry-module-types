import type { Actor, Collection, Item } from '../foundry/index.js';

export interface SkillRollResult {
  total: number;
  success: boolean;
  criticalSuccess?: boolean;
  criticalFailure?: boolean;
}

export type TravelRole = 'pathfinder' | 'lookout' | 'quartermaster';

export abstract class SystemAdapter {
  abstract getSkillValue(actor: Actor, skillName: string): number | null;
  abstract rollSkill(actor: Actor, skillName: string): Promise<SkillRollResult>;
  abstract triggerSkillRoll(actor: Actor, skillName: string): void | Promise<void>;
  abstract hasSkill(actor: Actor, skillName: string): boolean;
  abstract getActorSpeed(actor: Actor, mounted: boolean): number;
}

export interface SystemMovementConfig {
  onFoot: {
    value: number;
    unit: string;
  };
  mounted: {
    value: number;
    unit: string;
  };
}

export interface SystemSkillConfig {
  pathfinding: string;
  lookout: string;
  quartermaster: string;
  hunting: string;
  foraging: string;
}

export interface SystemDiceConfig {
  randomEncounter: string;
  encounterThreshold: number;
  pathfinding: string;
  weather: string;
}

export interface SystemAssetConfig {
  defaultPartyImage: string;
}

export interface SystemConfig {
  id: string;
  name: string;
  movement: SystemMovementConfig;
  skills: SystemSkillConfig;
  dice: SystemDiceConfig;
  assets: SystemAssetConfig;
  timeUnit: string;
}

export interface SystemConfigManager {
  getConfig(): SystemConfig;
  updateFromSettings(settings: Partial<SystemConfig>): void;
  getMovementRate(mounted?: boolean): { value: number; unit: string };
  getSkillName(role: keyof SystemSkillConfig): string;
  getDiceFormula(check: keyof SystemDiceConfig): string | number;
  isKnownSystem(): boolean;
}

export interface SkillChoice {
  id: string;
  name: string;
  label: string;
}

export interface SkillManager {
  getAvailableSkills(): Record<string, string>;
  registerSkillSettings(): void;
  findBestMatch(desiredSkill: string, availableSkills: Record<string, string>): string;
}

export interface PendingRoll {
  id: string;
  actorId: string;
  skillName: string;
  purpose: 'hunt-tracking' | 'hunt-kill' | 'fish' | 'forage' | 'cook';
  timestamp: number;
  callback: (success: boolean) => void;
  resolved?: boolean;
  allowPush?: boolean;
}

export interface SkillRollTracker {
  queueRoll(
    actorId: string,
    skillName: string,
    purpose: PendingRoll['purpose'],
    callback: (success: boolean) => void,
    allowPush?: boolean
  ): string;
  destroy(): void;
}

export interface FoodGatheringResult {
  success: boolean;
  rations: number;
  description: string;
  complications?: string;
}

export interface HuntingResult extends FoodGatheringResult {
  animal?: string;
  requiresWeapon: boolean;
  canUseTrap: boolean;
}

export interface FoodGatheringSystem {
  isDragonbaneCoresetAvailable(): boolean;
  isDragonbaneSystem(): boolean;
  hunt(actor: Actor): Promise<HuntingResult>;
  fish(actor: Actor, hasRod: boolean, hasNet: boolean): Promise<FoodGatheringResult>;
  forage(actor: Actor, season?: 'spring' | 'summer' | 'fall' | 'winter'): Promise<FoodGatheringResult>;
  cook(
    actor: Actor,
    rawRations: number,
    hasFieldKitchen?: boolean,
    hasProperKitchen?: boolean
  ): Promise<FoodGatheringResult>;
}

export interface JourneysAndJamboreesAPI {
  readonly systemAdapter: SystemAdapter;
  readonly skillManager: SkillManager;
  readonly systemConfig: SystemConfigManager;
  readonly skillRollTracker: SkillRollTracker;
  readonly foodGathering: FoodGatheringSystem;
  version: string;
  isUsingAdapter(adapterName: string): boolean;
}

declare global {
  interface Game {
    journeysAndJamborees?: {
      api?: JourneysAndJamboreesAPI;
      systemAdapterFactory?: {
        getAdapter(): SystemAdapter;
      };
    };
  }

  interface Module {
    api?: JourneysAndJamboreesAPI;
  }

  interface CONFIG {
    DND5E?: {
      skills: Record<string, { label: string; ability?: string }>;
      abilities?: Record<string, string>;
    };
  }

  interface Actor {
    getSkill?(skillName: string): Item | null | undefined;
    rollSkill?(skillName: string, options?: Record<string, unknown>): Promise<unknown>;
    rollAbility?(abilityName: string, options?: Record<string, unknown>): Promise<unknown>;
    createEmbeddedDocuments?(
      embeddedName: string,
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
  }

  interface CompendiumCollection<T = unknown> {
    getIndex?(): Promise<Collection<T>>;
  }
}

export {};
