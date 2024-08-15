import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcademyComponent } from './academy/academy.component';
import { CreateAcademyComponent } from './create-academy/create-academy.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';

const routes: Routes = [
  {
    path: '',  
    component: AppComponent,
    children: [
      {
        path: '',  
        component: AcademyComponent  
      },
    ]
  }, {
    path: 'create',
    component: CreateAcademyComponent
  },
  {
    path: 'course/create',
    component: CreatecourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
