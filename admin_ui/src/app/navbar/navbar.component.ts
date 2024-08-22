import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDropdownOpen = false;

 
  constructor(private router: Router, public appService: AppService){
 
  }
  toggleNavbar() {
    // Toggle mobile navbar (you may need to use Angular's ViewChild to control this)
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // when navigated by routes to services/serviceId, update the selected value
  onChange(selected: any) { 
 
    if(selected.id == this.appService.AppConstants.default_option) this.router.navigateByUrl('/');
    else this.router.navigateByUrl(`/academy/${selected.id}`);
  }
}