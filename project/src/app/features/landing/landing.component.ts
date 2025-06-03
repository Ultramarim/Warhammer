import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <body>
    
  
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="text-center mb-5">
          <h1 class="game-title display-4">TableTopWarGame</h1>
          <p class="lead">Track your battles, manage resources, and claim victory for your faction!</p>
        </div>
        
        <div class="row">
          <div class="col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-header">
                <h2 class="h5 mb-0">
                  <i class="fas fa-play me-2"></i>New Battle
                </h2>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Begin a new Warhammer battle. Set up your armies, choose missions, and prepare for glory!</p>
                <div class="text-center mt-auto">
                  <button (click)="startNewGame()" class="btn btn-primary btn-lg">
                    <i class="fas fa-dice me-2"></i>Start New Game
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-header">
                <h2 class="h5 mb-0">
                  <i class="fas fa-history me-2"></i>Battle History
                </h2>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Review your previous battles, analyze strategies, and learn from past victories and defeats.</p>
                <div class="text-center mt-auto">
                  <button routerLink="/history" class="btn btn-secondary btn-lg">
                    <i class="fas fa-scroll me-2"></i>View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card mt-4">
          <div class="card-header">
            <h2 class="h5 mb-0">
              <i class="fas fa-info-circle me-2"></i>About This Tracker
            </h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-3 mb-md-0">
                <div class="feature text-center">
                  <i class="fas fa-chess-knight fa-3x mb-3" style="color: var(--accent)"></i>
                  <h3 class="h5">Army Management</h3>
                  <p class="small">Track units, points, and capabilities during battle</p>
                </div>
              </div>
              <div class="col-md-4 mb-3 mb-md-0">
                <div class="feature text-center">
                  <i class="fas fa-medal fa-3x mb-3" style="color: var(--accent)"></i>
                  <h3 class="h5">Mission Tracking</h3>
                  <p class="small">Manage primary and secondary mission objectives</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="feature text-center">
                  <i class="fas fa-chart-line fa-3x mb-3" style="color: var(--accent)"></i>
                  <h3 class="h5">Point Scoring</h3>
                  <p class="small">Keep track of victory points and command points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
  `,
  styles: [`
    .display-4 {
      font-size: 2.5rem;
    }
    


    @media (min-width: 768px) {
      .display-4 {
        font-size: 3.5rem;
      }
    }
    
    .lead {
      color: var(--light);
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    }
    
    .feature i {
      transition: transform 0.3s ease;
    }
    
    .feature:hover i {
      transform: scale(1.2);
    }
     p{
    color: white;
}
    h3{
    color: white;
    }
    
    i{
    color: white;
    }

  `]
})
export class LandingComponent {
  constructor(private router: Router) {}
  
  startNewGame() {
    this.router.navigate(['/setup']);
  }
}