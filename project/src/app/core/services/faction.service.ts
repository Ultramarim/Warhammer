import { Injectable } from '@angular/core';
import { Faction } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class FactionService {
  private factionIcons: Record<Faction, string> = {
    // 40k Factions
    [Faction.SPACE_MARINES]: 'fa-shield-halved',
    [Faction.CHAOS_SPACE_MARINES]: 'fa-skull',
    [Faction.ASTRA_MILITARUM]: 'fa-gun',
    [Faction.ORKS]: 'fa-bomb',
    [Faction.TYRANIDS]: 'fa-worm',
    [Faction.NECRONS]: 'fa-ankh',
    [Faction.TAU_EMPIRE]: 'fa-circle-half-stroke',
    [Faction.ELDAR]: 'fa-gem',
    [Faction.DARK_ELDAR]: 'fa-droplet',
    [Faction.ADEPTUS_MECHANICUS]: 'fa-gear',
    [Faction.DEATH_GUARD]: 'fa-virus',
    [Faction.THOUSAND_SONS]: 'fa-eye',
    [Faction.GREY_KNIGHTS]: 'fa-hammer',
    [Faction.CUSTODES]: 'fa-trophy',
    [Faction.SISTERS_OF_BATTLE]: 'fa-cross',
    [Faction.GENESTEALER_CULTS]: 'fa-people-group',
    [Faction.HARLEQUINS]: 'fa-masks-theater',
    [Faction.KNIGHTS]: 'fa-chess-knight',
    [Faction.CHAOS_KNIGHTS]: 'fa-horse',
    [Faction.DAEMONS]: 'fa-ghost',
    
    // Age of Sigmar Factions
    [Faction.STORMCAST_ETERNALS]: 'fa-bolt',
    [Faction.NIGHTHAUNT]: 'fa-ghost',
    [Faction.SERAPHON]: 'fa-dragon',
    [Faction.SLAVES_TO_DARKNESS]: 'fa-spaghetti-monster-flying',
    [Faction.DAUGHTERS_OF_KHAINE]: 'fa-person-dress',
    [Faction.KHARADRON_OVERLORDS]: 'fa-ship',
    [Faction.SYLVANETH]: 'fa-tree',
    [Faction.SKAVEN]: 'fa-rat',
    [Faction.BEASTS_OF_CHAOS]: 'fa-paw',
    [Faction.FLESH_EATER_COURTS]: 'fa-crown',
    [Faction.IDONETH_DEEPKIN]: 'fa-water',
    [Faction.LUMINETH_REALM_LORDS]: 'fa-mountain-sun',
    [Faction.SOULBLIGHT_GRAVELORDS]: 'fa-bone',
    [Faction.OSSIARCH_BONEREAPERS]: 'fa-skull-crossbones',
    [Faction.CITIES_OF_SIGMAR]: 'fa-city',
    [Faction.ORRUK_WARCLANS]: 'fa-hammer',
    [Faction.GLOOMSPITE_GITZ]: 'fa-hat-wizard'
  };

  private factionColors: Record<Faction, string> = {
    // 40k Factions
    [Faction.SPACE_MARINES]: '#0047AB',
    [Faction.CHAOS_SPACE_MARINES]: '#8B0000',
    [Faction.ASTRA_MILITARUM]: '#5D8C46',
    [Faction.ORKS]: '#1E8449',
    [Faction.TYRANIDS]: '#800080',
    [Faction.NECRONS]: '#2E8B57',
    [Faction.TAU_EMPIRE]: '#F08080',
    [Faction.ELDAR]: '#FFD700',
    [Faction.DARK_ELDAR]: '#9932CC',
    [Faction.ADEPTUS_MECHANICUS]: '#B22222',
    [Faction.DEATH_GUARD]: '#556B2F',
    [Faction.THOUSAND_SONS]: '#00008B',
    [Faction.GREY_KNIGHTS]: '#708090',
    [Faction.CUSTODES]: '#DAA520',
    [Faction.SISTERS_OF_BATTLE]: '#FFFFFF',
    [Faction.GENESTEALER_CULTS]: '#8E44AD',
    [Faction.HARLEQUINS]: '#FF69B4',
    [Faction.KNIGHTS]: '#CD853F',
    [Faction.CHAOS_KNIGHTS]: '#8B4513',
    [Faction.DAEMONS]: '#FF0000',
    
    // Age of Sigmar Factions
    [Faction.STORMCAST_ETERNALS]: '#FFD700',
    [Faction.NIGHTHAUNT]: '#48D1CC',
    [Faction.SERAPHON]: '#1E90FF',
    [Faction.SLAVES_TO_DARKNESS]: '#696969',
    [Faction.DAUGHTERS_OF_KHAINE]: '#DC143C',
    [Faction.KHARADRON_OVERLORDS]: '#B87333',
    [Faction.SYLVANETH]: '#228B22',
    [Faction.SKAVEN]: '#A52A2A',
    [Faction.BEASTS_OF_CHAOS]: '#8B4513',
    [Faction.FLESH_EATER_COURTS]: '#8B0000',
    [Faction.IDONETH_DEEPKIN]: '#00BFFF',
    [Faction.LUMINETH_REALM_LORDS]: '#FFFFFF',
    [Faction.SOULBLIGHT_GRAVELORDS]: '#800000',
    [Faction.OSSIARCH_BONEREAPERS]: '#F5F5DC',
    [Faction.CITIES_OF_SIGMAR]: '#4682B4',
    [Faction.ORRUK_WARCLANS]: '#006400',
    [Faction.GLOOMSPITE_GITZ]: '#9ACD32'
  };

  getFactions(): Faction[] {
    return Object.values(Faction);
  }

  getFortyKFactions(): Faction[] {
    return [
      Faction.SPACE_MARINES,
      Faction.CHAOS_SPACE_MARINES,
      Faction.ASTRA_MILITARUM,
      Faction.ORKS,
      Faction.TYRANIDS,
      Faction.NECRONS,
      Faction.TAU_EMPIRE,
      Faction.ELDAR,
      Faction.DARK_ELDAR,
      Faction.ADEPTUS_MECHANICUS,
      Faction.DEATH_GUARD,
      Faction.THOUSAND_SONS,
      Faction.GREY_KNIGHTS,
      Faction.CUSTODES,
      Faction.SISTERS_OF_BATTLE,
      Faction.GENESTEALER_CULTS,
      Faction.HARLEQUINS,
      Faction.KNIGHTS,
      Faction.CHAOS_KNIGHTS,
      Faction.DAEMONS
    ];
  }

  getAoSFactions(): Faction[] {
    return [
      Faction.STORMCAST_ETERNALS,
      Faction.NIGHTHAUNT,
      Faction.SERAPHON,
      Faction.SLAVES_TO_DARKNESS,
      Faction.DAUGHTERS_OF_KHAINE,
      Faction.KHARADRON_OVERLORDS,
      Faction.SYLVANETH,
      Faction.SKAVEN,
      Faction.BEASTS_OF_CHAOS,
      Faction.FLESH_EATER_COURTS,
      Faction.IDONETH_DEEPKIN,
      Faction.LUMINETH_REALM_LORDS,
      Faction.SOULBLIGHT_GRAVELORDS,
      Faction.OSSIARCH_BONEREAPERS,
      Faction.CITIES_OF_SIGMAR,
      Faction.ORRUK_WARCLANS,
      Faction.GLOOMSPITE_GITZ
    ];
  }

  getFactionIcon(faction: Faction): string {
    return this.factionIcons[faction] || 'fa-question';
  }

  getFactionColor(faction: Faction): string {
    return this.factionColors[faction] || '#888888';
  }
}