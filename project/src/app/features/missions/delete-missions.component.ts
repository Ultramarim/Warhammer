import { Component, OnInit, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { Table } from '../../core/common/mision';
import { ApiMisionesService } from '../../core/services/misions.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-edit-missions',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FontAwesomeModule],

  template: `

     
    <h1>Delete mission</h1>

    <h2>{{table.length}}</h2>

    <div class="container">
    <div class="row">
    @for (tables of table; track tables._id) {
        <div class="row border rounder">
            <div class="col-md-2 algin-self-center">
                <div class="col-md-12">
                <h3>{{tables.title}}</h3>
                <small class="text-danger">{{tables.points}}</small>
                </div>
                <div class="pb-2"></div>
            </div>
        </div>
        <div class="col-md-1 remove d-flex">
            <h3 class="ms-auto-algin-self-center">
                <fa-icon (click)="removeMission(tables)" class="text-danger" [icon]="faThasCan"></fa-icon>
            </h3>
        </div>
    }
  </div>

  <div class="mb-2"></div>
  `,
  styles: [`

.border{
  box-shadow: 2px 2px lightgrey;
}
.row:hover, .pointer:hover{
  cursor: pointer;
}
.fa-plus-circle{
  color: limegreen;
}
#plot{
  height: 150px;
}

    
  `]
})
export class DeletemissionComponent  {

  private readonly missionService: ApiMisionesService = inject(ApiMisionesService);

  table: Table[] = [];

  constructor(){
    this.loadmissions();
  }
  protected loadmissions(){
    this.missionService.getMisions().subscribe(
        {
            next: value => {
                console.log(value);
               this.table = value;
            },
            error: err => {
                console.error('Error to load missions', err);
            },
            complete: () => {
                console.log('Missions loaded')
            }
        }
    )
  }

  removeMission(table: Table) {
    if (confirm('Are you sure you want to delete this mission? '+ table.title)){
        this.missionService.removeMision(table._id).subscribe(
            {
                next: value => {
                    console.log(value);
                },
                complete: () => {
                    console.log('mission deleted');
                },
                error: err => {
                    console.error('Error deleting mission', err);
                }
            }
        )
    }
  }

  protected readonly faThasCan = faTrashCan;
  }
  
  
