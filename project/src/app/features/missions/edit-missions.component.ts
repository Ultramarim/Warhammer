import { Component, OnInit, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { Table } from '../../core/common/mision';
import { ApiMisionesService } from '../../core/services/misions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mission } from '../../core/models/game.model';

@Component({
  selector: 'app-edit-missions',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],

  template: `

     
    <h1>Edit mission</h1>




    <form [formGroup]="formMission" (ngSubmit)="onSubmit()">

        <h3>Id</h3>
      <div class="form-floating mb-3">
        <input formControlName="_id" 
        type="id" class="form-control"
        id="id" 
        placeholder="id">
      </div>

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

       <button type="submit" class="btn btn-primary btn-lg" (click)="onSubmit()">Edit mission</button>
    </form>
  
   


  
  `,
  styles: [`
.placeholder{
  color: white
}
    
  `]
})
export class EditmissionComponent implements OnInit {
    @Input() mission: Mission | undefined;
  @Input({required: true}) table!: Table;
  @Input({required: true}) editar!: boolean;

  private readonly missionService: ApiMisionesService = inject(ApiMisionesService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  formMission: FormGroup = this.formBuilder.group({
    _id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    points: [0, Validators.required],
  });

  get title(): any{
    return this.formMission.get('title');
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
    }
}

  ngOnInit(): void {
   if (this.editar){
    this.formMission.setValue(this.table);
   } else {
    this.formMission.reset();
   }
    };
  }
  
  
