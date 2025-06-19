import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game, GameStatus, Player, Faction, LogEntryType, LogEntry, Mission } from '../models/game.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private storageKey = 'warhammer-games';
  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private currentGameSubject = new BehaviorSubject<Game | null>(null);
  
  games$ = this.gamesSubject.asObservable();
  currentGame$ = this.currentGameSubject.asObservable();

  constructor() {
    this.loadGames();
  }

  private loadGames(): void {
    const savedGames = localStorage.getItem(this.storageKey);
    if (savedGames) {
      try {
        const games = JSON.parse(savedGames);
        // Convert string dates back to Date objects
        games.forEach((game: Game) => {
          game.createdAt = new Date(game.createdAt);
          game.updatedAt = new Date(game.updatedAt);
          game.battleLog.forEach(entry => {
            entry.timestamp = new Date(entry.timestamp);
          });
        });
        this.gamesSubject.next(games);
      } catch (e) {
        console.error('Error loading games from localStorage', e);
        this.gamesSubject.next([]);
      }
    }
  }

  private saveGames(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.gamesSubject.value));
  }

  createNewGame(name: string): Game {
    const newGame: Game = {
      id: this.generateId(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentRound: 0,
      totalRounds: 5,
      status: GameStatus.SETUP,
      players: [],
      missions: this.getDefaultMissions(),
      battleLog: []
    };

    const games = [...this.gamesSubject.value, newGame];
    this.gamesSubject.next(games);
    this.currentGameSubject.next(newGame);
    this.saveGames();
    
    return newGame;
  }

  addPlayer(gameId: string, name: string, faction: Faction, armyPoints: number): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === gameId);
    
    if (gameIndex === -1) return;
    
    const game = { ...games[gameIndex] };
    const playerId = game.players.length + 1;
    
    const player: Player = {
      id: playerId,
      name,
      faction,
      armyPoints,
      commandPoints: this.calculateStartingCommandPoints(armyPoints),
      victoryPoints: 0,
      units: [],
      secondaryMissions: []
    };
    
    game.players = [...game.players, player];
    game.updatedAt = new Date();
    
    games[gameIndex] = game;
    this.gamesSubject.next(games);
    this.currentGameSubject.next(game);
    this.saveGames();
  }

  startGame(gameId: string): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === gameId);
    
    if (gameIndex === -1) return;
    
    const game = { ...games[gameIndex] };
    game.status = GameStatus.IN_PROGRESS;
    game.currentRound = 1;
    game.updatedAt = new Date();
    
    // Add game start log entry
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      round: 0,
      type: LogEntryType.GAME_START,
      description: `Battle "${game.name}" has begun! ${game.players[0].name} (${game.players[0].faction}) vs ${game.players[1].name} (${game.players[1].faction})`,
      
    };

 
    game.battleLog = [...game.battleLog, logEntry];
    
    games[gameIndex] = game;
    this.gamesSubject.next(games);
    this.currentGameSubject.next(game);
    this.saveGames();
    console.log(this.startGame)
  }

   

  updateGame(updatedGame: Game): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === updatedGame.id);
    
    if (gameIndex === -1) return;
    
    updatedGame.updatedAt = new Date();
    games[gameIndex] = updatedGame;
    
    this.gamesSubject.next(games);
    this.currentGameSubject.next(updatedGame);
    this.saveGames();
  }

 

  getGameById(id: string): Observable<Game | undefined> {
    return this.games$.pipe(
      map(games => {
        const game = games.find(g => g.id === id);
        if (game) {
          this.currentGameSubject.next(game);
        }
        return game;
      })
    );
  }

  nextRound(gameId: string): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === gameId);
    
    if (gameIndex === -1) return;
    
    const game = { ...games[gameIndex] };
    
    // End the current round
    const endRoundLog: LogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      round: game.currentRound,
      type: LogEntryType.ROUND_END,
      description: `Round ${game.currentRound} has ended.`
    };
    
    game.battleLog = [...game.battleLog, endRoundLog];
    
    // Start the next round
    game.currentRound += 1;
    
    // Check if the game is over
    if (game.currentRound > game.totalRounds) {
      game.status = GameStatus.COMPLETED;
      
      const gameEndLog: LogEntry = {
        id: this.generateId(),
        timestamp: new Date(),
        round: game.currentRound - 1,
        type: LogEntryType.GAME_END,
        description: this.determineWinner(game)
      };
      
      game.battleLog = [...game.battleLog, gameEndLog];
    } else {
      // Start new round log
      const startRoundLog: LogEntry = {
        id: this.generateId(),
        timestamp: new Date(),
        round: game.currentRound,
        type: LogEntryType.ROUND_START,
        description: `Round ${game.currentRound} has begun.`
      };
      
      game.battleLog = [...game.battleLog, startRoundLog];
    }
    
    game.updatedAt = new Date();
    games[gameIndex] = game;
    
    this.gamesSubject.next(games);
    this.currentGameSubject.next(game);
    this.saveGames();
  }

  updatePoints(gameId: string, playerId: number, commandPoints: number | null, victoryPoints: number | null): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === gameId);
    
    if (gameIndex === -1) return;
    
    const game = { ...games[gameIndex] };
    const playerIndex = game.players.findIndex(p => p.id === playerId);
    
    if (playerIndex === -1) return;
    
    const player = { ...game.players[playerIndex] };
    let logEntries: LogEntry[] = [];
    
    if (commandPoints !== null && commandPoints !== player.commandPoints) {
      const difference = commandPoints - player.commandPoints;
      const action = difference > 0 ? 'gained' : 'spent';
      const absValue = Math.abs(difference);
      
      player.commandPoints = commandPoints;
      
      const logEntry: LogEntry = {
        id: this.generateId(),
        timestamp: new Date(),
        round: game.currentRound,
        playerId: player.id,
        type: LogEntryType.COMMAND_POINTS,
        description: `${player.name} ${action} ${absValue} Command Point${absValue !== 1 ? 's' : ''}. New total: ${commandPoints}`
      };
      
      logEntries.push(logEntry);
    }
    
    if (victoryPoints !== null && victoryPoints !== player.victoryPoints) {
      const difference = victoryPoints - player.victoryPoints;
      const action = difference > 0 ? 'gained' : 'lost';
      const absValue = Math.abs(difference);
      
      player.victoryPoints = victoryPoints;
      
      const logEntry: LogEntry = {
        id: this.generateId(),
        timestamp: new Date(),
        round: game.currentRound,
        playerId: player.id,
        type: LogEntryType.VICTORY_POINTS,
        description: `${player.name} ${action} ${absValue} Victory Point${absValue !== 1 ? 's' : ''}. New total: ${victoryPoints}`
      };
      
      logEntries.push(logEntry);
    }
    
    const updatedPlayers = [...game.players];
    updatedPlayers[playerIndex] = player;
    
    game.players = updatedPlayers;
    game.battleLog = [...game.battleLog, ...logEntries];
    game.updatedAt = new Date();
    
    games[gameIndex] = game;
    this.gamesSubject.next(games);
    this.currentGameSubject.next(game);
    this.saveGames();
  }

  addCustomLogEntry(gameId: string, description: string, playerId?: number): void {
    const games = [...this.gamesSubject.value];
    const gameIndex = games.findIndex(g => g.id === gameId);
    
    if (gameIndex === -1) return;
    
    const game = { ...games[gameIndex] };
    
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      round: game.currentRound,
      playerId,
      type: LogEntryType.CUSTOM,
      description
    };

    
    
    
    game.battleLog = [...game.battleLog, logEntry];
    game.updatedAt = new Date();
    
    games[gameIndex] = game;
    this.gamesSubject.next(games);
    this.currentGameSubject.next(game);
    this.saveGames();
  }

  deleteGame(gameId: string): void {
    const games = this.gamesSubject.value.filter(game => game.id !== gameId);
    this.gamesSubject.next(games);
    
    if (this.currentGameSubject.value?.id === gameId) {
      this.currentGameSubject.next(null);
    }
    
    this.saveGames();
  }

  // Helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private calculateStartingCommandPoints(armyPoints: number): number {
    // This is a simplified version - actual CP calculation depends on the game edition and army composition
    if (armyPoints <= 500) return 3;
    if (armyPoints <= 1000) return 6;
    if (armyPoints <= 2000) return 12;
    return 18; // For larger games
  }

  private determineWinner(game: Game): string {
    if (game.players.length !== 2) return 'Game ended.';
    
    const player1 = game.players[0];
    const player2 = game.players[1];
    
    if (player1.victoryPoints > player2.victoryPoints) {
      return `Battle concluded! ${player1.name} (${player1.faction}) is victorious with ${player1.victoryPoints} Victory Points vs ${player2.name}'s ${player2.victoryPoints} Victory Points!`;
    } else if (player2.victoryPoints > player1.victoryPoints) {
      return `Battle concluded! ${player2.name} (${player2.faction}) is victorious with ${player2.victoryPoints} Victory Points vs ${player1.name}'s ${player1.victoryPoints} Victory Points!`;
    } else {
      return `Battle concluded in a draw! Both players scored ${player1.victoryPoints} Victory Points.`;
    }
  }

  private getDefaultMissions(): Mission[] {
    return [
      {
        id: 'primary-1',
        name: 'Take and Hold',
        description: 'Control objective markers to earn victory points at the end of each round.',
        victoryConditions: 'Earn 5 VP for each objective marker controlled at the end of your turn.',
        type: 'primary',
        maxPoints: 45
      },
      {
        id: 'secondary-1',
        name: 'Assassinate',
        description: 'Destroy enemy character units.',
        victoryConditions: 'Earn 3 VP for each enemy character destroyed.',
        type: 'secondary',
        maxPoints: 15
      },
      {
        id: 'secondary-2',
        name: 'Behind Enemy Lines',
        description: 'Have units in the enemy deployment zone.',
        victoryConditions: 'Earn 2 VP for each of your units wholly within the enemy deployment zone at the end of your turn.',
        type: 'secondary',
        maxPoints: 12
      },
      {
        id: 'secondary-3',
        name: 'Linebreaker',
        description: 'Penetrate enemy territory with your units.',
        victoryConditions: 'Earn 4 VP if you have at least two units wholly within 6" of the enemy battlefield edge at the end of your turn.',
        type: 'secondary',
        maxPoints: 12
      },
      {
        id: 'secondary-4',
        name: 'Bring It Down',
        description: 'Focus fire on enemy vehicles and monsters.',
        victoryConditions: 'Earn 2 VP for each enemy vehicle or monster destroyed.',
        type: 'secondary',
        maxPoints: 15
      }
    ];
  }


}