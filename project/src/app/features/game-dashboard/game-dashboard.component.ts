import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import { FactionService } from '../../core/services/faction.service';
import { Game, Player, Mission, SecondaryMission, Faction, GameStatus, LogEntryType, LogEntry } from '../../core/models/game.model';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { PointTrackerComponent } from './point-tracker/point-tracker.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { ApiMisionesService } from '../../core/services/misions.service';
import { Table } from '../../core/common/mision';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-game-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MissionCardComponent,
    PointTrackerComponent,
    BattleLogComponent,
    RouterLink,
    NgbModule
  ],
  
  template: `
 
    <div *ngIf="game; else loading">
      <div class="row">
        <div class="col-md-12 mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="game-title mb-0">{{ game.name }}</h2>
            
            <div *ngIf="game.status === gameStatus.IN_PROGRESS">
              <div class="round-counter">
                {{ game.currentRound }}
              </div>
              <div class="text-center text-light">Round</div>
            </div>
            
            <div *ngIf="game.status === gameStatus.SETUP">
              <button class="btn btn-primary" (click)="startGame()">
                <i class="fas fa-play me-2"></i>Begin Battle

              </button>
            </div>
            
            <div *ngIf="game.status === gameStatus.COMPLETED">
              <span class="badge bg-accent">Battle Completed</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Player Dashboards -->
      <div class="row mb-4">
        <div class="col-md-6 mb-4 mb-md-0" *ngFor="let player of game.players">
          <div class="card h-100">
            <div class="card-header d-flex align-items-center" 
                 [ngStyle]="{'background-color': getFactionColor(player.faction)}">
              <div>
                <i class="fas" [ngClass]="getFactionIcon(player.faction)"></i>
                <span class="ms-2">{{ player.name }}</span>
              </div>
              <div class="ms-auto">
                <span class="badge bg-dark">{{ player.faction }}</span>
              </div>
            </div>
            
            <div class="card-body">
              <app-point-tracker 
                [player]="player" 
                [gameId]="game.id"
                [gameStatus]="game.status">
              </app-point-tracker>
              
              <div class="mt-3" *ngIf="game.status === gameStatus.IN_PROGRESS || game.status === gameStatus.COMPLETED">
                <h5 class="mb-3">Secondary Missions</h5>
                <div class="row">
                  <div class="col-md-6 mb-3" *ngFor="let secondaryMission of player.secondaryMissions">
                   
                  </div>


  @if(player.slectedMision) {
   <div class="card bg-dark text-white border-accent">
      <div class="card-header bg-accent text-dark">
        <h5 class="card-title mb-0">{{ player.slectedMision.title }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-dark text-white">
          <strong>Description:</strong> {{ player.slectedMision.description }}
        </li>
        <li class="list-group-item bg-dark text-white">
          <strong>Points:</strong> {{ player.slectedMision.points }}
        </li>
      
      </ul>
      <div class="card-footer">
        <button class="btn btn-accent" (click)="confirmSelection(player)">
          Complete mission
        </button>
      </div>
    </div>
  }

   <div class="col-12" >
     <div class="dropdown mb-3">
      <ul class dropdown-menu bg-dark >
       @for(mision of this.misions; track mision._id){
       <li >
        <a class="dropdown-item text-white" 
              (click)="selectMission(player, mision)">
              {{ mision.title }}
            </a>
          </li>
  }
          </ul>
        </div>
       </div>
     </div>
    </div>
  </div>
</div>
</div>
</div>



      
      <!-- Battle Controls and Log -->
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-header">
              <h3 class="h5 mb-0">
                <i class="fas fa-chess me-2"></i>Battle Controls
              </h3>
            </div>
            <div class="card-body">
              <div *ngIf="game.status === gameStatus.IN_PROGRESS">
                <button class="btn btn-primary w-100 mb-3" (click)="nextRound()">
                  <i class="fas fa-forward me-2"></i>Next Round
                </button>
                
                <div class="form-group mb-3">
                  <label for="logEntry" class="form-label">Battle Log Entry:</label>
                  <textarea 
                    class="form-control mb-2" 
                    id="logEntry" 
                    rows="2" 
                    [(ngModel)]="newLogEntry"
                    placeholder="Record a key event..."
                  ></textarea>
                  <div class="d-flex">
                    <select class="form-select me-2" [(ngModel)]="logEntryPlayerId">
                      <option [ngValue]="null">No Player</option>
                      <option *ngFor="let player of game.players" [ngValue]="player.id">
                        {{ player.name }}
                      </option>
                    </select>
                    <button 
                      class="btn btn-secondary" 
                      [disabled]="!newLogEntry.trim()" 
                      (click)="addLogEntry()"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              
              <div *ngIf="game.status === gameStatus.COMPLETED">
                <div class="alert alert-accent">
                  <i class="fas fa-trophy me-2"></i>
                  <strong>Battle Concluded!</strong>
                </div>
                
                <p>
                  Final Score:<br>
                  <strong>{{ game.players[0].name }}:</strong> {{ game.players[0].victoryPoints }} VP<br>
                  <strong>{{ game.players[1].name }}:</strong> {{ game.players[1].victoryPoints }} VP
                </p>
                
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" routerLink="/">
                    <i class="fas fa-home me-2"></i>Return to Home
                  </button>
                  <button class="btn btn-secondary" (click)="newGame()">
                    <i class="fas fa-plus me-2"></i>New Battle
                  </button>
                </div>
              </div>
              
              <div *ngIf="game.status === gameStatus.SETUP">
                <div class="alert alert-secondary">
                  <i class="fas fa-info-circle me-2"></i>
                  Click "Begin Battle" to start the first round.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-8 mb-4">
          <div class="card h-100">
            <div class="card-header">
              <h3 class="h5 mb-0">
                <i class="fas fa-scroll me-2"></i>Battle Log
              </h3>
            </div>
            <div class="card-body p-0">
              <app-battle-log [logEntries]="game.battleLog" [players]="game.players"></app-battle-log>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mission Selection Modal -->
      <div class="modal fade" id="missionModal" tabindex="-1" aria-labelledby="missionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-light border-accent">
            <div class="modal-header border-accent">
              <h5 class="modal-title" id="missionModalLabel">Select Secondary Mission</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="list-group">
                <button 
                  *ngFor="let mission of availableSecondaryMissions"
                  class="list-group-item list-group-item-action bg-secondary text-light mb-2 border-accent"
                  (click)="selectSecondaryMission(mission)"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ mission.name }}</h5>
                    <small>{{ mission.maxPoints }} pts</small>
                  </div>
                  <p class="mb-1">{{ mission.description }}</p>
                  <small>{{ mission.victoryConditions }}</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ng-template #loading>
      <div class="text-center py-5">
        <div class="loading-skull">
          <i class="fas fa-skull"></i>
          <p class="mt-3">Loading battle data...</p>
        </div>
      </div>
    </ng-template>
    
  `,
  styles: [`
    .border-accent {
      border-color: var(--accent) !important;
    }
    
    .bg-accent {
      background-color: var(--accent) !important;
      color: var(--dark) !important;
    }
    
    .alert-accent {
      background-color: rgba(212, 175, 55, 0.2);
      border-color: var(--accent);
      color: var(--accent);
    }

    button{
    color: white;
    }

    h5{
    color: white;
    }

    label{
      color: white;
    }

    ::placeholder{
      color: white;
    }

    .logEntry{
      color: white;
    }

    p{
      color: white;
    }
    
    .empty-state-text{
    color: white;
    }

    dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-item {
  cursor: pointer;
  transition: all 0.3s;
}

.dropdown-item:hover {
  background-color: rgba(212, 175, 55, 0.3) !important;
}


.card {
  border-width: 2px;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.list-group-item {
  border-color: rgba(212, 175, 55, 0.3);
}
  `]
})
export class GameDashboardComponent implements OnInit, OnDestroy {
  private readonly misionService: ApiMisionesService = inject(ApiMisionesService);
  game: Game | undefined;
  gameStatus = GameStatus;
  private gameSubscription: Subscription | undefined;
  private gameId: string | null = null;
  
  // For mission selection
  selectedPlayer: Player | null = null;
  availableSecondaryMissions: Mission[] = [];
  misions: Table[] = [];
    selectedMission: any = null;
    players: Player[] = [];
    
  
  // For log entries
  newLogEntry = '';
  logEntryPlayerId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private factionService: FactionService
   
  ) {
     this.loadMisions();
  }
 protected loadMisions() {
   this.misionService.getMisions().subscribe(
    {
      next: value => {
        console.log(value);
        this.misions = value;
      },
      error: err =>{
        console.error('Error to load missions: ', err);
      },
      complete: () => {
        console.log('loading complete.')
     }
    }
   )
  }
  

  selectMission( player: Player, mission: any) {
    if (player.secondaryMissions.length < 3) {
      player.slectedMision = mission;
    }
  }


  confirmSelection(player: Player) {
    if (player.slectedMision) {
        player.secondaryMissions.push({
          ...player.slectedMision,
          completedAt: new Date()
        });

      

        player.victoryPoints += (player.slectedMision.points || 0) ||player.slectedMision.maxPoints;

         player.slectedMision = null;
 
     
    }
  }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.gameSubscription = this.gameService.getGameById(this.gameId).subscribe(game => {
          if (game) {
            this.game = game;
            
            // Initialize selected missions for new games
            if (game.status === GameStatus.SETUP) {
              this.initializePlayerSecondaryMissions();
            }
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }
  
  getFactionIcon(faction: Faction): string {
    return this.factionService.getFactionIcon(faction);
  }
  
  getFactionColor(faction: Faction): string {
    return this.factionService.getFactionColor(faction);
  }
  
  getMissionById(missionId: string): Mission | undefined {
    return this.game?.missions.find(m => m.id === missionId);
  }
  
  startGame(): void {
    if (this.gameId) {
      this.gameService.startGame(this.gameId);
    }
    window.location.reload();
  }
  
  nextRound(): void {
    if (this.gameId) {
      this.gameService.nextRound(this.gameId);
    }
  }
  
  newGame(): void {
    this.router.navigate(['/setup']);
  }
  
  addLogEntry(): void {
    if (this.gameId && this.newLogEntry.trim()) {
      this.gameService.addCustomLogEntry(this.gameId, this.newLogEntry, this.logEntryPlayerId as any);
      this.newLogEntry = '';
      this.logEntryPlayerId = null;
    }
  }
  
  showSelectMissionModal(player: Player): void {
    this.selectedPlayer = player;
    
    // Get available secondary missions
    if (this.game) {
      const selectedMissionIds = player.secondaryMissions.map(sm => sm.missionId);
      this.availableSecondaryMissions = this.game.missions
        .filter(mission => 
          mission.type === 'secondary' && 
          !selectedMissionIds.includes(mission.id)
        );
    }
    
    // Show modal
    const modal = document.getElementById('missionModal');
    if (modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }
  
  selectSecondaryMission(mission: Mission): void {
    if (this.selectedPlayer && this.game) {
      const playerIndex = this.game.players.findIndex(p => p.id === this.selectedPlayer?.id);
      
      if (playerIndex !== -1) {
        const player = { ...this.game.players[playerIndex] };
        
        const secondaryMission: SecondaryMission = {
          missionId: mission.id,
          currentPoints: 0,
          maxPoints: mission.maxPoints
        };
        
        player.secondaryMissions = [...player.secondaryMissions, secondaryMission];
        
        const updatedPlayers = [...this.game.players];
        updatedPlayers[playerIndex] = player;
        
        const updatedGame = { ...this.game, players: updatedPlayers };
        this.gameService.updateGame(updatedGame);
        
        // Close modal
        const modal = document.getElementById('missionModal');
        if (modal) {
          const bsModal = bootstrap.Modal.getInstance(modal);
          bsModal?.hide();
        }
      }
    }
  }
  
  updateSecondaryMissionPoints(playerId: number, data: { missionId: string, points: number }): void {
    if (this.game) {
      const playerIndex = this.game.players.findIndex(p => p.id === playerId);
      
      if (playerIndex !== -1) {
        const player = { ...this.game.players[playerIndex] };
        const missionIndex = player.secondaryMissions.findIndex(sm => sm.missionId === data.missionId);
        
        if (missionIndex !== -1) {
          const secondaryMissions = [...player.secondaryMissions];
          secondaryMissions[missionIndex] = {
            ...secondaryMissions[missionIndex],
            currentPoints: data.points
          };
          
          player.secondaryMissions = secondaryMissions;
          
          // Update victory points (sum of all secondary missions)
          const secondaryPoints = secondaryMissions.reduce((sum, sm) => sum + sm.currentPoints, 0);
          
          // Need to pass both command points (unchanged) and victory points
          this.gameService.updatePoints(this.game.id, player.id, player.commandPoints, secondaryPoints);
        }
      }
    }
  }
  
  private initializePlayerSecondaryMissions(): void {
    if (this.game && this.game.players.every(player => player.secondaryMissions.length === 0)) {
      // Initially empty secondary missions
      for (const player of this.game.players) {
        player.secondaryMissions = [];
      }
      
      this.gameService.updateGame(this.game);
    }
  }
}

// Bootstrap Modal interface
declare var bootstrap: {
  Modal: {
    getInstance(element: Element): { hide(): void } | null;
    new(element: Element): { show(): void, hide(): void };
  }
};