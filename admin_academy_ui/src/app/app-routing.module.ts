import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcademyComponent } from './academy/academy.component';
import { CreateAcademyComponent } from './create-academy/create-academy.component';

const routes: Routes = [
  {
    path: '', // The default route for this micro app
    component: AppComponent,
    children: [
      {
        path: '', // Child route
        component: AcademyComponent // Replace with your actual child component
      },
    ]
  }, {
    path: 'create',
    component: CreateAcademyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
