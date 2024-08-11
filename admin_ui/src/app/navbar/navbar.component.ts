import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router, public appService: AppService){
 
  }

  // when navigated by routes to services/serviceId, update the selected value
  onChange(selected: any) { 

    console.log({selected})
    if(selected.id == 0) this.router.navigateByUrl('/');
    else if(selected.id == 1) this.router.navigateByUrl(`/my_services/academy/${selected.id}`);
  }
}