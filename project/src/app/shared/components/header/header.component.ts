import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-dark text-light border-bottom border-accent">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <a class="navbar-brand" routerLink="/">
            <i class="fas fa-dice-d20 me-2"></i>
            <span class="game-title">TableTopWarGame</span>
          </a>
          
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/setup" routerLinkActive="active">New Game</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/history" routerLinkActive="active">Game History</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/missions" routerLinkActive="active">Create a mission</a>
              </li>
               <li class="nav-item">
                <a class="nav-link" routerLink="/edit-missions" routerLinkActive="active">Edit missions</a>
              </li>
               <li class="nav-item">
                <a class="nav-link" routerLink="/delete-missions" routerLinkActive="active">Delete missions</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .navbar-brand {
      display: flex;
      align-items: center;
    }
    
    .game-title {
      font-size: 1.5rem;
      margin: 0;
    }
    
    .navbar {
      padding: 0.5rem 0;
    }
    
    .nav-link {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      transition: color 0.3s ease;
      padding: 0.5rem 1rem;
      margin: 0 0.2rem;
      border-radius: 0.25rem;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--accent);
      background-color: rgba(212, 175, 55, 0.1);
    }
    
    .border-accent {
      border-color: var(--accent) !important;
    }
  `]
})
export class HeaderComponent {}