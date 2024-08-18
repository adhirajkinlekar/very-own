import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  academies = [
    {
      name: 'Tech Academy',
      description: 'Learn cutting-edge skills in technology today.',
      id: "66c1a81a10ce243407a495ea",
      imageUrl: 'https://cdn.dribbble.com/users/8065509/screenshots/16031359/artboard_3_4x.png'
    },
    {
      name: 'Business Academy',
      description: 'Master business administration and management.',
      id: "66c1e4c2ea0b556b4c828aa3",
      imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/1*W1Uso3Kb8sTxVuUEn82JRA.jpeg'
    } 
  ];
  constructor(){

  }
  CreateAcademy(){
    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/create` }
    });
    
    window.dispatchEvent(navigateEvent);
  }

  handleClick(academyId:any){

    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/${academyId}` }
    });
    
    window.dispatchEvent(navigateEvent);
  }
}
