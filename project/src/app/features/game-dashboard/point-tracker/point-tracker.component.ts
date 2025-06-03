import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player, GameStatus } from '../../../core/models/game.model';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-point-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row mb-3">
      <div class="col-6">
        <div class="points-box command-points">
          <div class="points-box-header">
            <i class="fas fa-bolt me-2"></i>Command Points
          </div>
          <div class="points-box-value">{{ player.commandPoints }}</div>
          <div class="points-box-controls" *ngIf="gameStatus === 'IN_PROGRESS'">
            <button 
              class="btn btn-sm btn-outline-danger" 
              (click)="updateCommandPoints(player.commandPoints - 1)"
              [disabled]="player.commandPoints <= 0"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button 
              class="btn btn-sm btn-outline-success" 
              (click)="updateCommandPoints(player.commandPoints + 1)"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="col-6">
        <div class="points-box victory-points">
          <div class="points-box-header">
            <i class="fas fa-trophy me-2"></i>Victory Points
          </div>
          <div class="points-box-value">{{ player.victoryPoints }}</div>
          <div class="points-box-controls" *ngIf="gameStatus === 'IN_PROGRESS'">
            <button 
              class="btn btn-sm btn-outline-danger" 
              (click)="updateVictoryPoints(player.victoryPoints - 1)"
              [disabled]="player.victoryPoints <= 0"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button 
              class="btn btn-sm btn-outline-success" 
              (click)="updateVictoryPoints(player.victoryPoints + 1)"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .points-box {
      background-color: rgba(26, 26, 26, 0.8);
      border: 1px solid;
      border-radius: 0.5rem;
      padding: 0.75rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .command-points {
      border-color: #2a7fff;
      color:white;
    }
    
    .victory-points {
      border-color: #d4af37;
      color:white;
    }
    
    .points-box-header {
      font-size: 0.85rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .points-box-value {
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .command-points .points-box-value {
      color: #2a7fff;
    }
    
    .victory-points .points-box-value {
      color: #d4af37;
    }
    
    .points-box-controls {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class PointTrackerComponent {
  @Input() player!: Player;
  @Input() gameId!: string;
  @Input() gameStatus!: GameStatus;
  
  constructor(private gameService: GameService) {}
  
  updateCommandPoints(newValue: number): void {
    if (newValue >= 0 && this.gameStatus === GameStatus.IN_PROGRESS) {
      this.gameService.updatePoints(this.gameId, this.player.id, newValue, null);
    }
  }
  
  updateVictoryPoints(newValue: number): void {
    if (newValue >= 0 && this.gameStatus === GameStatus.IN_PROGRESS) {
      this.gameService.updatePoints(this.gameId, this.player.id, null, newValue);
    }
  }
}