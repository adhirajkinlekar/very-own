import { Component } from '@angular/core';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.scss'
})
export class AcademyComponent {
  profits: number = 156.78;
  customers: number = 36;
  courses: number = 2;

   
  handleClick(){

    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: 'my_services/academy/1/course/create' }
    });
    
    window.dispatchEvent(navigateEvent);
  }
}
