import { Component, OnInit, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { Table } from '../../core/common/mision';
import { ApiMisionesService } from '../../core/services/misions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-missions',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],

  template: `

     
    <h1>Edit mission</h1>

   <h2>{{table.length}}</h2>

    <div class="container">
    <div class="row">
    @for (tables of table; track tables._id) {
        <div class="row border rounder">
            <div class="col-md-2 algin-self-center">
                <div class="col-md-12">
                <h3>{{tables.title}}</h3>
            
                </div>
                <div class="pb-2"></div>
            </div>
        </div>

    }
  </div>

  <div class="mb-2"></div>

    <form (ngSubmit)="onSubmit()">

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

       
    </form>
  <button type="submit" class="btn btn-primary btn-lg" (click)="onSubmit()" >Edit mission</button>
   


  
  `,
  styles: [`
.placeholder{
  color: white
}
    
  `]
})
export class EditmissionComponent  {

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
        console.error('Error to load missions', err)
      },
      complete: () => {
        console.log('Missions loaded')
      }
    }
  )
}


  
  onSubmit() {
   
    if (this.form && this.form.valid) {
      this.missionService.updateMision(this.form.value).subscribe(
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
      );
    }
  }

  form: FormGroup = inject(FormBuilder).group({
    _id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    points: [0, [Validators.required, Validators.min(0)]]
  });
}
