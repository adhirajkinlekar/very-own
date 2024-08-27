import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  academies: any = [];
  courseCount = 0;
  loading: boolean = true;

  constructor(private service: AcademyService) {


    this.service.getDashboard().subscribe(({ academies, courseCount }) => {
      this.academies = academies;
      this.courseCount = courseCount
      this.loading = false; // Set loading to false when data is loaded

    },err=>{
      this.loading = false; // Set loading to false when data is loaded

    })
  }

  CreateAcademy() {
    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/create` }
    });

    window.dispatchEvent(navigateEvent);
  }

  handleClick(academyId: any) {

    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/${academyId}` }
    });

    window.dispatchEvent(navigateEvent);
  }

  truncateText(text: string, limit: number = 18): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
