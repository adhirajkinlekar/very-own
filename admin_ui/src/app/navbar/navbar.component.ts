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
  isNavbarOpen = false;  // For toggling mobile navbar visibility

  constructor(private router: Router, public appService: AppService) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;  // Toggle mobile navbar
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;  // Toggle dropdown
  }

  onChange(selected: any) {
    if (selected.id == this.appService.AppConstants.default_option) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl(`/academy/${selected.id}`);
    }
  }

  logOut() {
    this.appService.deleteCookie('VERY_OWN_JWT_TOKEN');
  }
}
