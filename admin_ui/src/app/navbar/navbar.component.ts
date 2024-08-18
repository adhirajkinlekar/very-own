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
 
    if(selected.id == this.appService.AppConstants.default_option) this.router.navigateByUrl('/');
    else this.router.navigateByUrl(`/my_services/academy/${selected.id}`);
  }
}