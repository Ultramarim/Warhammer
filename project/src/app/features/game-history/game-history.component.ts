import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import { FactionService } from '../../core/services/faction.service';
import { Game, GameStatus, Faction } from '../../core/models/game.model';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [CommonModule, RouterLink],

  template: `
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="text-center mb-4">
          <h1 class="game-title h3">Battle History</h1>
          <p class="text-light">Review your past battles and analyze your victories and defeats.</p>
        </div>
        
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 mb-0">
                <i class="fas fa-history me-2"></i>Recent Battles
              </h2>
              <div>
                <button class="btn btn-sm btn-accent" routerLink="/setup">
                  <i class="fas fa-plus me-2"></i>New Battle
                </button>
              </div>
            </div>
            
            <div *ngIf="games.length === 0" class="text-center py-5">
              <i class="fas fa-scroll fa-3x mb-3 empty-state-icon"></i>
              <p class="empty-state-text">No battle records found.</p>
              <p class="empty-state-text">Start a new battle to begin your conquest!</p>
            </div>
            
            <div *ngIf="games.length > 0">
              <div class="table-responsive">
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Battle Name</th>
                      <th>Players</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let game of sortedGames">
                      <td>{{ game.name }}</td>
                      <td>
                        <div *ngFor="let player of game.players" class="player-badge">
                          <i class="fas" [ngClass]="getFactionIcon(player.faction)"></i>
                          {{ player.name }} ({{ player.victoryPoints }} VP)
                        </div>
                      </td>
                      <td>
                        <span class="badge" [ngClass]="getStatusBadgeClass(game.status)">
                          {{ getStatusText(game.status) }}
                        </span>
                      </td>
                      <td>{{ game.createdAt | date:'shortDate' }}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-primary" [routerLink]="['/game', game.id]">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-danger" (click)="deleteGame(game.id)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div class="stats-card" *ngIf="games.length > 0">
          <div class="card">
            <div class="card-header">
              <h2 class="h5 mb-0">
                <i class="fas fa-chart-bar me-2"></i>Battle Statistics
              </h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="stat-box">
                    <div class="stat-label">Total Battles</div>
                    <div class="stat-value">{{ games.length }}</div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="stat-box">
                    <div class="stat-label">Completed</div>
                    <div class="stat-value">{{ completedGames.length }}</div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="stat-box">
                    <div class="stat-label">In Progress</div>
                    <div class="stat-value">{{ inProgressGames.length }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`

   

    .player-badge {
      font-size: 0.9rem;
      white-space: nowrap;
    }
    
    .player-badge i {
      margin-right: 5px;
    }
    
    .badge.bg-setup {
      background-color: #6c757d;
    }
    
    .badge.bg-in-progress {
      background-color: #007bff;
    }
    
    .badge.bg-completed {
      background-color: #28a745;
    }
    
    .stat-box {
      background-color: rgba(42, 42, 42, 0.7);
      border: 1px solid var(--accent);
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
    }
    
    .stat-label {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: var(--light);
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--accent);
    }
    
    .table {
      color: var(--light);
    }
    
    .table-dark {
      background-color: rgba(42, 42, 42, 0.7);
    }
    
    .table-hover tbody tr:hover {
      background-color: rgba(212, 175, 55, 0.1);
    }
       
      h2{
        color: white;
      }

    .empty-state-text{
    color: white;
    }

    .empty-state-icon{
    color: white;
    }

  `]
})
export class GameHistoryComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  private gamesSubscription: Subscription | undefined;
  
  constructor(
    private gameService: GameService,
    private factionService: FactionService
  ) {}
  
  ngOnInit(): void {
    this.gamesSubscription = this.gameService.games$.subscribe(games => {
      this.games = games;
    });
  }
  
  ngOnDestroy(): void {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }
  
  get sortedGames(): Game[] {
    return [...this.games].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }
  
  get completedGames(): Game[] {
    return this.games.filter(game => game.status === GameStatus.COMPLETED);
  }
  
  get inProgressGames(): Game[] {
    return this.games.filter(game => game.status === GameStatus.IN_PROGRESS);
  }
  
  deleteGame(gameId: string): void {
    if (confirm('Are you sure you want to delete this battle record?')) {
      this.gameService.deleteGame(gameId);
    }
  }
  
  getFactionIcon(faction: Faction): string {
    return this.factionService.getFactionIcon(faction);
  }
  
  getStatusBadgeClass(status: GameStatus): string {
    switch (status) {
      case GameStatus.SETUP:
        return 'bg-setup';
      case GameStatus.IN_PROGRESS:
        return 'bg-in-progress';
      case GameStatus.COMPLETED:
        return 'bg-completed';
      default:
        return 'bg-secondary';
    }
  }
  
  getStatusText(status: GameStatus): string {
    switch (status) {
      case GameStatus.SETUP:
        return 'Setup';
      case GameStatus.IN_PROGRESS:
        return 'In Progress';
      case GameStatus.COMPLETED:
        return 'Completed';
      default:
        return 'Unknown';
    }
  }
}