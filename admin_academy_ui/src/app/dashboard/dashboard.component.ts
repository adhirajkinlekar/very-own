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
      imageUrl: 'https://i1.rgstatic.net/ii/profile.image/302688879742978-1449178060484_Q512/Stephen-Grider.jpg'
    },
    {
      name: 'Business Academy',
      description: 'Master business administration and management.',
      id: "66c1e4c2ea0b556b4c828aa3",
      imageUrl: 'https://avatars.githubusercontent.com/u/5003903?v=4'
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
