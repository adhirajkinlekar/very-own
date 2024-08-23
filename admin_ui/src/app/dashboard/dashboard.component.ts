import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { 
  totalRevenue: number = 0; // Example data, replace with actual
  enrolledServices: Array<{ name: string; status: string }> = [];


  ngOnInit(): void {
    // Example data. Replace this with an actual API call to fetch user services
    this.enrolledServices = [
      { name: 'Auth Service', status: 'Active' }, 
    ];
  }

  visitService(service: { name: string; status: string }): void {
    // Logic to handle navigation or open service details
    // For example, navigate to a service detail page or show a modal
    console.log(`Visiting ${service.name}`);
  }
} 