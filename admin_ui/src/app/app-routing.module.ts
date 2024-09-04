import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ServiceTypesComponent } from './service-types/service-types.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: DashboardComponent
//   },
//   {
//     path: 'all_services',
//     component: ServiceTypesComponent
//   },
//   {
//     path: 'my_services', 
//     children: [
//       {
//         path: "academy/:academyId",
//         loadChildren: () => loadRemoteModule({
//           type:"module",
//           remoteEntry: "http://localhost:4201/remoteEntry.js",
//           exposedModule: './app.module',
//         }).then(m => m.AppModule) 
//        }
//     ]
//   },
//   {
//     path: 'services', 
//     children: [
//       {
//         path: "academy",
//         loadChildren: () => loadRemoteModule({
//           type:"module",
//           remoteEntry: "http://localhost:4201/remoteEntry.js",
//           exposedModule: './app.module',
//         }).then(m => m.AppModule) 
//        }
//     ]
//   } 
// ];  

const overviewRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'all_services',
    component: ServiceTypesComponent
  } 
];  

const academyRoutes:Routes = [
  {
    path: '',  
        loadChildren: () => loadRemoteModule({
          type:"module",
          remoteEntry: "http://remote-academy.admin.veryown.in/remoteEntry.js",
          exposedModule: './app.module',
        }).then(m => m.AppModule) 
  }  
]

const hostnameSplit = window.location.hostname.split(".");

const routes = (hostnameSplit.length === 3 || 
  (hostnameSplit.length === 4 && hostnameSplit[0] === "overview")) 
  ? overviewRoutes 
  : hostnameSplit[0] === "academy" 
  ? academyRoutes 
  : [];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 


// // app.routing.ts

// const TEST_routes: Routes = [
//   {
//     path: '',
//     component: TestPageComponent,
//   },
// ];

// const PROJECT_routes: Routes = [
//   {
//     /// all needed routes of the whole main project
//   },
// ];

// const isCurrentDomainTest: boolean =
// (window.location.hostname === 'test.localhost') || // local
// (window.location.hostname === 'test.yourdomain.com'); // prod

//  imports: [
//    RouterModule.forRoot(
//     isCurrentDomainTest ? TEST_routes : PROJECT_routes)
// ]