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
  constructor(private service: AcademyService) {


    this.service.getDashboard().subscribe(({ academies, courseCount }) => {
      this.academies = academies;
      this.courseCount = courseCount
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
}
