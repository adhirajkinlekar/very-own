import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ServiceTypesComponent } from './service-types/service-types.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'all_services',
    component: ServiceTypesComponent
  },
  {
    path: 'my_services', 
    children: [
      {
        path: "academy/:id",
        loadChildren: () => loadRemoteModule({
          type:"module",
          remoteEntry: "http://localhost:4201/remoteEntry.js",
          exposedModule: './app.module',
        }).then(m => m.AppModule) 
       }
    ]
  }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 