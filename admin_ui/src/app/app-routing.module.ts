import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 


const routes: Routes = [
  {
    path: 'academy', 
    loadChildren: () => loadRemoteModule({
      type:"module",
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      exposedModule: './app.module',
    }).then(m => m.AppModule) 
   },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 