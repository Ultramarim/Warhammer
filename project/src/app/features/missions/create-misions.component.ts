import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from '../../core/common/mision';
import { ApiMisionesService } from '../../core/services/misions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],

  template: `

     
    <h1>Create a mission</h1>

    <form [formGroup]="formMission" (ngsubmit)="onSubmit()">
      <h3>Title</h3>
    <div class="form-floating mb-3">
      <input formControlName="title"
      type="text" class="form-control"
      id="title"
      placeholder="Title">
    </div>

    <h3>Description</h3>
    <div class="form-foating mb-3">
      <input formControlName="description"
      type="text" class="form-control"
      id="description"
      placeholder="Description">
    </div>
    <h3>Points</h3>
    <div class="form-floating mb-3">
      <input formControlName="points"
      type="number" class="form-control"
      id="points"
      placeholder="Points">
    </div>

    </form>
  
   
   <button type="submit" class="btn btn-primary btn-lg" (click)="onSubmit()">Create mission</button>

  
  `,
  styles: [`
.placeholder{
  color: white
}
    
  `]
})
export class MissionComponent implements OnInit {
  @Input({required: true}) table!: Table;
  @Input({required: true}) editar!: boolean;

  private readonly missionService: ApiMisionesService = inject(ApiMisionesService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formMission: FormGroup = this.formBuilder.group({
    title: [''],
    description: [''],
    points: [0]
  });

  get title(): any{
    return this.formMission.get('tutle');
  }
  get description(): any{
    return this.formMission.get('description');
  }
  get points(): any{
    return this.formMission.get('points');
  }

  onSubmit() {
    if(this.editar){
      this.missionService.updateMision(this.formMission.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('updated');
          },
          error: err => {
            console.error(err);
          }
        }
      )
    }else{
    this.missionService.newMision(this.formMission.getRawValue()).subscribe(
      {
        next: value => {
          console.log(value);
        },
        complete: () => {
          console.log('Mission created');
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }
}

  ngOnInit(): void {
   if (this.editar){
    this.formMission.setValue(this.table);
   }else{
    this.formMission.reset();
   }
    };
  }
  
  
