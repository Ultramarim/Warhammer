export interface Game {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  currentRound: number;
  totalRounds: number;
  status: GameStatus;
  players: Player[];
  missions: Mission[];
  battleLog: LogEntry[];
}

export interface Player {
  id: number; // 1 or 2
  name: string;
  faction: Faction;
  armyPoints: number;
  commandPoints: number;
  victoryPoints: number;
  units: Unit[];
  secondaryMissions: SecondaryMission[];
}

export interface Unit {
  id: string;
  name: string;
  type: string;
  startingWounds: number;
  currentWounds: number;
  points: number;
  abilities: string[];
  isDestroyed: boolean;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  victoryConditions: string;
  type: 'primary' | 'secondary';
  maxPoints: number;
}

export interface SecondaryMission {
  missionId: string;
  currentPoints: number;
  maxPoints: number;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  round: number;
  playerId?: number;
  type: LogEntryType;
  description: string;
}

export enum LogEntryType {
  GAME_START = 'GAME_START',
  ROUND_START = 'ROUND_START',
  ROUND_END = 'ROUND_END',
  COMMAND_POINTS = 'COMMAND_POINTS',
  VICTORY_POINTS = 'VICTORY_POINTS',
  UNIT_DAMAGED = 'UNIT_DAMAGED',
  UNIT_DESTROYED = 'UNIT_DESTROYED',
  MISSION_PROGRESS = 'MISSION_PROGRESS',
  MISSION_COMPLETE = 'MISSION_COMPLETE',
  GAME_END = 'GAME_END',
  CUSTOM = 'CUSTOM'
}



export enum GameStatus {
  SETUP = 'SETUP',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum Faction {
  // Warhammer 40k Factions
  SPACE_MARINES = 'Space Marines',
  CHAOS_SPACE_MARINES = 'Chaos Space Marines',
  ASTRA_MILITARUM = 'Astra Militarum',
  ORKS = 'Orks',
  TYRANIDS = 'Tyranids',
  NECRONS = 'Necrons',
  TAU_EMPIRE = 'T\'au Empire',
  ELDAR = 'Aeldari',
  DARK_ELDAR = 'Drukhari',
  ADEPTUS_MECHANICUS = 'Adeptus Mechanicus',
  DEATH_GUARD = 'Death Guard',
  THOUSAND_SONS = 'Thousand Sons',
  GREY_KNIGHTS = 'Grey Knights',
  CUSTODES = 'Adeptus Custodes',
  SISTERS_OF_BATTLE = 'Adepta Sororitas',
  GENESTEALER_CULTS = 'Genestealer Cults',
  HARLEQUINS = 'Harlequins',
  KNIGHTS = 'Imperial Knights',
  CHAOS_KNIGHTS = 'Chaos Knights',
  DAEMONS = 'Chaos Daemons',
  
  // Age of Sigmar Factions
  STORMCAST_ETERNALS = 'Stormcast Eternals',
  NIGHTHAUNT = 'Nighthaunt',
  SERAPHON = 'Seraphon',
  SLAVES_TO_DARKNESS = 'Slaves to Darkness',
  DAUGHTERS_OF_KHAINE = 'Daughters of Khaine',
  KHARADRON_OVERLORDS = 'Kharadron Overlords',
  SYLVANETH = 'Sylvaneth',
  SKAVEN = 'Skaven',
  BEASTS_OF_CHAOS = 'Beasts of Chaos',
  FLESH_EATER_COURTS = 'Flesh-eater Courts',
  IDONETH_DEEPKIN = 'Idoneth Deepkin',
  LUMINETH_REALM_LORDS = 'Lumineth Realm-lords',
  SOULBLIGHT_GRAVELORDS = 'Soulblight Gravelords',
  OSSIARCH_BONEREAPERS = 'Ossiarch Bonereapers',
  CITIES_OF_SIGMAR = 'Cities of Sigmar',
  ORRUK_WARCLANS = 'Orruk Warclans',
  GLOOMSPITE_GITZ = 'Gloomspite Gitz'
}