import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mission, Player, GameStatus } from '../../../core/models/game.model';

@Component({
  selector: 'app-mission-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mission-card" [class.active]="currentPoints > 0">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="mission-card-title mb-0">{{ mission?.name }}</h5>
        <span class="badge bg-primary">{{ currentPoints }}/{{ maxPoints }}</span>
      </div>
      
      <div *ngIf="expanded" class="mission-details mb-2">
        <p class="mission-card-description">{{ mission?.description }}</p>
        <p class="mission-card-condition"><small>{{ mission?.victoryConditions }}</small></p>
      </div>
      
      <div class="d-flex justify-content-between align-items-center">
        <button 
          class="btn btn-sm btn-link p-0 text-light" 
          (click)="toggleExpanded()"
        >
          {{ expanded ? 'Less' : 'More' }} info
          <i class="fas" [ngClass]="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
        
        <div class="points-controls" *ngIf="gameStatus === 'IN_PROGRESS'">
          <button 
            class="btn btn-sm btn-outline-danger" 
            [disabled]="currentPoints <= 0"
            (click)="decreasePoints()"
          >
            <i class="fas fa-minus"></i>
          </button>
          <input 
            type="number" 
            class="form-control form-control-sm points-input" 
            [min]="0" 
            [max]="maxPoints" 
            [(ngModel)]="currentPoints"
            (change)="updatePoints()"
          >
          <button 
            class="btn btn-sm btn-outline-success" 
            [disabled]="currentPoints >= maxPoints"
            (click)="increasePoints()"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mission-card {
      background-color: rgba(42, 42, 42, 0.9);
      border: 1px solid var(--accent);
      border-radius: 0.5rem;
      padding: 0.75rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }
    
    .mission-card.active {
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
    
    .mission-card-title {
      color: var(--accent);
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .mission-card-description {
      color: var(--light);
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .mission-card-condition {
      color: var(--light);
      opacity: 0.8;
      font-size: 0.8rem;
      margin-bottom: 0;
    }
    
    .points-controls {
      display: flex;
      align-items: center;
    }
    
    .points-input {
      width: 50px;
      text-align: center;
      margin: 0 5px;
      padding: 0.25rem;
    }
  `]
})
export class MissionCardComponent {
  @Input() mission: Mission | undefined;
  @Input() player!: Player;
  @Input() gameId!: string;
  @Input() gameStatus!: GameStatus;
  @Input() currentPoints: number = 0;
  @Input() maxPoints: number = 0;
  
  @Output() pointsUpdated = new EventEmitter<{ missionId: string, points: number }>();
  
  expanded = false;
  
  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  
  decreasePoints(): void {
    if (this.currentPoints > 0) {
      this.currentPoints--;
      this.updatePoints();
    }
  }
  
  increasePoints(): void {
    if (this.currentPoints < this.maxPoints) {
      this.currentPoints++;
      this.updatePoints();
    }
  }
  
  updatePoints(): void {
    if (this.mission) {
      this.pointsUpdated.emit({
        missionId: this.mission.id,
        points: this.currentPoints
      });
    }
  }
}