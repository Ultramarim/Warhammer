import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { FactionService } from '../../core/services/faction.service';
import { Faction } from '../../core/models/game.model';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="card">
          <div class="card-header d-flex align-items-center">
            <h2 class="h5 mb-0">
              <i class="fas fa-gamepad me-2"></i>New Battle Setup
            </h2>
            <div class="ms-auto">
              <span class="badge bg-primary rounded-pill">Step {{ currentStep }} of 4</span>
            </div>
          </div>
          <div class="card-body">
            <!-- Step 1: Game Name -->
            <div *ngIf="currentStep === 1">
              <h3 class="h5 mb-3">Battle Name</h3>
              <div class="mb-4">
                <label for="gameName" class="form-label">Enter a name for this battle:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="gameName" 
                  [(ngModel)]="gameName" 
                  placeholder="e.g., Battle for Macragge"
                  required
                >
                <div class="form-text text-light">This will help you identify the battle in your history.</div>
              </div>
              
              <div class="mb-4">
                <label for="gameRounds" class="form-label">Number of Game Rounds:</label>
                <select class="form-select" id="gameRounds" [(ngModel)]="totalRounds">
                  <option [value]="3">3 Rounds</option>
                  <option [value]="4">4 Rounds</option>
                  <option [value]="5" selected>5 Rounds (Standard)</option>
                  <option [value]="6">6 Rounds</option>
                  <option [value]="7">7 Rounds (crusade)</option>
                </select>
              </div>
            </div>
            
            <!-- Step 2: Player 1 Setup -->
            <div *ngIf="currentStep === 2">
              <h3 class="h5 mb-3">Player 1 Setup</h3>
              <div class="mb-3">
                <label for="player1Name" class="form-label">Player Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="player1Name" 
                  [(ngModel)]="player1.name" 
                  placeholder="Enter player name"
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="player1Faction" class="form-label">Choose Faction:</label>
                <div class="btn-group-vertical w-100" role="group" aria-label="Faction selection">
                  <div class="faction-selection">
                    <div class="faction-group mb-2">
                      <h5 class="faction-category">Warhammer 40,000</h5>
                      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" *ngFor="let faction of fortyKFactions">
                          <button
                            type="button"
                            class="btn w-100 text-start faction-btn"
                            [class.btn-accent]="player1.faction === faction"
                            [class.btn-outline-accent]="player1.faction !== faction"
                            (click)="player1.faction = faction"
                          >
                            <i class="fas" [ngClass]="getFactionIcon(faction)"></i>
                            {{ faction }}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div class="faction-group">
                 
                      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" *ngFor="let faction of aosFactions">
                          <button
                            type="button"
                            class="btn w-100 text-start faction-btn"
                            [class.btn-accent]="player1.faction === faction"
                            [class.btn-outline-accent]="player1.faction !== faction"
                            (click)="player1.faction = faction"
                          >
                            <i class="fas" [ngClass]="getFactionIcon(faction)"></i>
                            {{ faction }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="player1Points" class="form-label">Army Points:</label>
                <div class="input-group">
                  <input 
                    type="number" 
                    class="form-control" 
                    id="player1Points" 
                    [(ngModel)]="player1.points" 
                    placeholder="Enter army points"
                    min="0"
                    step="50"
                    required
                  >
                  <button class="btn btn-outline-secondary" type="button" (click)="player1.points = 500">500</button>
                  <button class="btn btn-outline-secondary" type="button" (click)="player1.points = 1000">1000</button>
                  <button class="btn btn-outline-secondary" type="button" (click)="player1.points = 2000">2000</button>
                </div>
              </div>
            </div>
            
            <!-- Step 3: Player 2 Setup -->
            <div *ngIf="currentStep === 3">
              <h3 class="h5 mb-3">Player 2 Setup</h3>
              <div class="mb-3">
                <label for="player2Name" class="form-label">Player Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="player2Name" 
                  [(ngModel)]="player2.name" 
                  placeholder="Enter player name"
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="player2Faction" class="form-label">Choose Faction:</label>
                <div class="btn-group-vertical w-100" role="group" aria-label="Faction selection">
                  <div class="faction-selection">
                    <div class="faction-group mb-2">
                      <h5 class="faction-category">Warhammer 40,000</h5>
                      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" *ngFor="let faction of fortyKFactions">
                          <button
                            type="button"
                            class="btn w-100 text-start faction-btn"
                            [class.btn-accent]="player2.faction === faction"
                            [class.btn-outline-accent]="player2.faction !== faction"
                            (click)="player2.faction = faction"
                          >
                            <i class="fas" [ngClass]="getFactionIcon(faction)"></i>
                            {{ faction }}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div class="faction-group">
                    
                      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" *ngFor="let faction of aosFactions">
                          <button
                            type="button"
                            class="btn w-100 text-start faction-btn"
                            [class.btn-accent]="player2.faction === faction"
                            [class.btn-outline-accent]="player2.faction !== faction"
                            (click)="player2.faction = faction"
                          >
                            <i class="fas" [ngClass]="getFactionIcon(faction)"></i>
                            {{ faction }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="player2Points" class="form-label">Army Points:</label>
                <div class="input-group">
                  <input 
                    type="number" 
                    class="form-control" 
                    id="player2Points" 
                    [(ngModel)]="player2.points" 
                    placeholder="Enter army points"
                    min="0"
                    step="50"
                    required
                  >
                  <button class="btn btn-outline-secondary" type="button" (click)="player2.points = 500">500</button>
                  <button class="btn btn-outline-secondary" type="button" (click)="player2.points = 1000">1000</button>
                  <button class="btn btn-outline-secondary" type="button" (click)="player2.points = 2000">2000</button>
                </div>
              </div>
            </div>
            
            <!-- Step 4: Confirmation -->
            <div *ngIf="currentStep === 4">
              <h3 class="h5 mb-3">Battle Summary</h3>
              
              <div class="summary-box mb-4">
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="h6 text-accent">Battle Details</h4>
                    <p><strong>Name:</strong> {{ gameName }}</p>
                    <p><strong>Rounds:</strong> {{ totalRounds }}</p>
                  </div>
                </div>
                
                <div class="row mt-3">
                  <div class="col-md-6">
                    <div class="player-summary">
                      <h4 class="h6 text-accent">Player 1</h4>
                      <p><strong>Name:</strong> {{ player1.name }}</p>
                      <p>
                        <strong>Faction:</strong> 
                        <span class="faction-display">
                          <i class="fas" [ngClass]="getFactionIcon(player1.faction)"></i>
                          {{ player1.faction }}
                        </span>
                      </p>
                      <p><strong>Army Points:</strong> {{ player1.points }}</p>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="player-summary">
                      <h4 class="h6 text-accent">Player 2</h4>
                      <p><strong>Name:</strong> {{ player2.name }}</p>
                      <p>
                        <strong>Faction:</strong> 
                        <span class="faction-display">
                          <i class="fas" [ngClass]="getFactionIcon(player2.faction)"></i>
                          {{ player2.faction }}
                        </span>
                      </p>
                      <p><strong>Army Points:</strong> {{ player2.points }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="alert alert-secondary">
                <i class="fas fa-info-circle me-2"></i>
                Click "Plan Game" to set up missions and begin the battle. You'll be able to track command points, victory points, and battle progress.
              </div>
            </div>
          </div>
          
          <div class="card-footer d-flex justify-content-between">
            <button 
              *ngIf="currentStep > 1" 
              class="btn btn-secondary" 
              (click)="previousStep()"
            >
              <i class="fas fa-arrow-left me-2"></i>Back
            </button>
            
            <div class="ms-auto">
              <button 
                *ngIf="currentStep < 4" 
                class="btn btn-primary" 
                (click)="nextStep()"
                [disabled]="!canProceed()"
              >
                Next<i class="fas fa-arrow-right ms-2"></i>
              </button>
              
              <button 
                *ngIf="currentStep === 4" 
                class="btn btn-accent glow-effect" 
                (click)="createGame()"
              >
                <i class="fas fa-dice-d20 me-2"></i>Plan Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faction-selection {
      max-height: 300px;
      overflow-y: auto;
      padding-right: 10px;
    }
    
    .faction-category {
      font-size: 1rem;
      margin-bottom: 10px;
      color: var(--accent);
      border-bottom: 1px solid var(--accent);
      padding-bottom: 5px;
    }
    
    .faction-btn {
      margin-bottom: 5px;
      text-align: left;
      transition: all 0.2s ease;
      font-size: 0.9rem;
      padding: 0.4rem 0.6rem;
    }
    
    .faction-btn i {
      margin-right: 8px;
      width: 20px;
      text-align: center;
    }
    
    .btn-outline-accent {
      color: var(--accent);
      border-color: var(--accent);
      background-color: transparent;
    }
    
    .btn-outline-accent:hover {
      color: var(--dark);
      background-color: var(--accent);
    }
    
    .summary-box {
      background-color: rgba(42, 42, 42, 0.5);
      border: 1px solid var(--accent);
      border-radius: 0.25rem;
      padding: 1rem;
    }
    
    .player-summary {
      border-left: 3px solid var(--accent);
      padding-left: 10px;
      margin-bottom: 15px;
    }
    
    .text-accent {
      color: var(--accent);
    }
    
    .faction-display {
      display: inline-block;
      padding: 2px 8px;
      background-color: rgba(212, 175, 55, 0.2);
      border-radius: 4px;
      margin-left: 5px;
    }
    
    .faction-display i {
      margin-right: 5px;
    }
      h3{
      color: white;
      }

      label{
      color: white;
      }

      p{
      color: white
      }

      ::placeholder{
      color: white;
      }

      button{
      color: white;
      }
     
  `]
})
export class GameSetupComponent implements OnInit {
  currentStep = 1;
  gameName = '';
  totalRounds = 5;
  
  player1 = {
    name: '',
    faction: Faction.SPACE_MARINES,
    points: 2000
  };
  
  player2 = {
    name: '',
    faction: Faction.CHAOS_SPACE_MARINES,
    points: 2000
  };
  
  fortyKFactions: Faction[] = [];
  aosFactions: Faction[] = [];
  
  constructor(
    private router: Router,
    private gameService: GameService,
    private factionService: FactionService
  ) {}
  
  ngOnInit(): void {
    this.fortyKFactions = this.factionService.getFortyKFactions();
    this.aosFactions = this.factionService.getAoSFactions();
  }
  
  nextStep(): void {
    if (this.canProceed()) {
      this.currentStep++;
    }
  }
  
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.gameName.trim();
      case 2:
        return !!this.player1.name.trim() && this.player1.points > 0;
      case 3:
        return !!this.player2.name.trim() && this.player2.points > 0;
      default:
        return true;
    }
  }
  
  createGame(): void {
    const newGame = this.gameService.createNewGame(this.gameName);
    
    // Set the game rounds
    newGame.totalRounds = this.totalRounds;
    this.gameService.updateGame(newGame);
    
    // Add players
    this.gameService.addPlayer(
      newGame.id, 
      this.player1.name, 
      this.player1.faction, 
      this.player1.points
    );
    
    this.gameService.addPlayer(
      newGame.id, 
      this.player2.name, 
      this.player2.faction, 
      this.player2.points
    );
    
    // Navigate to the game dashboard
    this.router.navigate(['/game', newGame.id]);
  }
  
  getFactionIcon(faction: Faction): string {
    return this.factionService.getFactionIcon(faction);
  }
}