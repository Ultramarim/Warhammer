import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntry, Player, LogEntryType } from '../../../core/models/game.model';

@Component({
  selector: 'app-battle-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="battle-log">
      <div *ngIf="logEntries.length === 0" class="text-center py-4">
        <i class="fas fa-scroll fa-2x mb-2 empty-state-icon"></i>
        <p class="empty-state-text">No battle events recorded yet.</p>
      </div>
      
      <div *ngFor="let entry of sortedLogEntries" class="log-entry" [ngClass]="getLogEntryClass(entry)">
        <div class="log-entry-header">
          <div class="log-entry-round" *ngIf="entry.round > 0">
            Round {{ entry.round }}
          </div>
          <div class="log-entry-time">
            {{ entry.timestamp | date:'shortTime' }}
          </div>
          <div class="log-entry-player" *ngIf="entry.playerId">
            {{ getPlayerName(entry.playerId) }}
          </div>
        </div>
        <div class="log-entry-content">
          <i class="fas empty-state-icon" [ngClass]="getLogEntryIcon(entry)"></i>
          <span class="empty-state-text">{{ entry.description }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .battle-log {
      max-height: 500px;
      overflow-y: auto;
    }
    
    .log-entry {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    }
    
    .log-entry:last-child {
      border-bottom: none;
    }
    
    .log-entry-header {
      display: flex;
      font-size: 0.8rem;
      color: #aaa;
      margin-bottom: 0.25rem;
    }
    
    .log-entry-round {
      font-weight: bold;
      margin-right: 0.5rem;
    }
    
    .log-entry-time {
      margin-right: 0.5rem;
    }
    
    .log-entry-player {
      font-style: italic;
    }
    
    .log-entry-content {
      display: flex;
      align-items: flex-start;
    }
    
    .log-entry-content i {
      margin-right: 0.5rem;
      margin-top: 0.25rem;
      width: 16px;
      text-align: center;
    }
    
    .log-entry.game-start {
      background-color: rgba(25, 25, 112, 0.3);
    }
    
    .log-entry.round-start {
      background-color: rgba(0, 100, 0, 0.3);
    }
    
    .log-entry.round-end {
      background-color: rgba(128, 0, 0, 0.3);
    }
    
    .log-entry.game-end {
      background-color: rgba(139, 0, 0, 0.5);
      font-weight: bold;
    }
    
    .log-entry.command-points {
      background-color: rgba(0, 0, 139, 0.2);
    }
    
    .log-entry.victory-points {
      background-color: rgba(184, 134, 11, 0.2);
    }

    .empty-state-text{
    color: white;
    }

    .empty-state-icon{
    color: white;
    }
  `]
})
export class BattleLogComponent {
  @Input() logEntries: LogEntry[] = [];
  @Input() players: Player[] = [];
  
  get sortedLogEntries(): LogEntry[] {
    return [...this.logEntries].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
  
  
  getPlayerName(playerId: number): string {
    const player = this.players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown';
  }
  
  getLogEntryClass(entry: LogEntry): string {
    switch (entry.type) {
      case LogEntryType.GAME_START:
        return 'game-start';
      case LogEntryType.ROUND_START:
        return 'round-start';
      case LogEntryType.ROUND_END:
        return 'round-end';
      case LogEntryType.GAME_END:
        return 'game-end';
      case LogEntryType.COMMAND_POINTS:
        return 'command-points';
      case LogEntryType.VICTORY_POINTS:
        return 'victory-points';
      default:
        return '';
    }
  }
  
  getLogEntryIcon(entry: LogEntry): string {
    switch (entry.type) {
      case LogEntryType.GAME_START:
        return 'fa-play';
      case LogEntryType.ROUND_START:
        return 'fa-hourglass-start';
      case LogEntryType.ROUND_END:
        return 'fa-hourglass-end';
      case LogEntryType.GAME_END:
        return 'fa-flag-checkered';
      case LogEntryType.COMMAND_POINTS:
        return 'fa-bolt';
      case LogEntryType.VICTORY_POINTS:
        return 'fa-trophy';
      case LogEntryType.UNIT_DAMAGED:
        return 'fa-heart-broken';
      case LogEntryType.UNIT_DESTROYED:
        return 'fa-skull';
      case LogEntryType.MISSION_PROGRESS:
        return 'fa-tasks';
      case LogEntryType.MISSION_COMPLETE:
        return 'fa-check-circle';
      case LogEntryType.CUSTOM:
        return 'fa-comment';
      default:
        return 'fa-info-circle';
    }
  }
}