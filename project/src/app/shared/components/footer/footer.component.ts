import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dark text-light py-3 border-top border-accent">
      <div class="container text-center">
        <p class="mb-0">
          <small>
            TableTopWarGame © {{currentYear}} | 
            <span class="text-accent">For use with Warhammer tabletop games</span> |
            <span class="disclaimer">Not affiliated with Games Workshop</span>
          </small>
        </p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      font-size: 0.9rem;
    }
    
    .border-accent {
      border-color: var(--accent) !important;
    }
    
    .text-accent {
      color: var(--accent);
    }
    
    .disclaimer {
      opacity: 0.7;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}