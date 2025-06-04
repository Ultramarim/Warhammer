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
     
    ];
  }

  getFactionIcon(faction: Faction): string {
    return this.factionIcons[faction] || 'fa-question';
  }

  getFactionColor(faction: Faction): string {
    return this.factionColors[faction] || '#888888';
  }
}