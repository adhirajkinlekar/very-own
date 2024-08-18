import { Component } from '@angular/core';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrl: './service-types.component.scss'
})
export class ServiceTypesComponent {

  createService(link:string){
    window.location.href = link;
  }
}
