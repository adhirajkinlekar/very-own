import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcademyComponent } from './academy/academy.component';
import { CreateAcademyComponent } from './create-academy/create-academy.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'academy/create',
    component: CreateAcademyComponent,
    pathMatch: 'full'
  },
  {
    path: 'academy/:academyId',
    component: AcademyComponent, 
    pathMatch: 'full'

  },
  {
    path: 'academy/:academyId/course/create',
    component: CreatecourseComponent,
    pathMatch: 'full'

  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];



// const routes: Routes = [
//   {
//     path: '',  
//     component: AppComponent,
//     children: [
//       {
//         path: '',  
//         component: AcademyComponent  
//       },
//     ]
//   }, {
//     path: 'create',
//     component: CreateAcademyComponent
//   },
//   {
//     path: 'course/create',
//     component: CreatecourseComponent
//   }
// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
