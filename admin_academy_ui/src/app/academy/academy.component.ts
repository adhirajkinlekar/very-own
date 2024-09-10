import { Component } from '@angular/core';
import { AcademyService } from '../academy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class AcademyComponent {
  academyId: string | null = null;
  courses: any = [];
  academyName: string = '';
  publicId: string = '';
  loading: boolean = true;

  constructor(
    private academyService: AcademyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.academyId = params.get('academyId');
    });

    this.academyService.getAcademy(this.academyId).subscribe(
      (data) => {
        this.academyName = data.academy.academyName;
        this.publicId = data.academy.publicId;
        this.courses = data.courses;
        this.loading = false; // Stop loading once data is fetched
      },
      (err) => {
        this.loading = false; // Stop loading on error as well
      }
    );
  }

  truncateText(text: string, limit: number = 35): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  handleClick() {
    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/${this.academyId}/course/create` },
    });
    window.dispatchEvent(navigateEvent);
  }
}
