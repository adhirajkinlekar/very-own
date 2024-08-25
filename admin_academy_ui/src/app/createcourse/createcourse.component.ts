import { Component } from '@angular/core';
import { AcademyService } from '../academy.service';
import { ActivatedRoute } from '@angular/router';

interface Lecture {
  title: string;
  url: string;
}

interface Section {
  title: string;
  lectures: Lecture[];
}

interface Course {
  title: string;
  headline: string;
  description: string;
  sections: Section[];
  imageUrl?: string; // Add imageUrl to the Course interface
}

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.scss']
})
export class CreatecourseComponent {
  academyId: string | null = null;
  course: Course = {
    title: '',
    headline: '',
    description: '',
    sections: []
  };
  courseImagePreview: string | ArrayBuffer | null = null; // For image preview

  constructor(private academyService: AcademyService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.academyId = params.get('academyId');
    });
  }

  addSection() {
    this.course.sections.push({ title: '', lectures: [{ title: '', url: '' }] });
  }

  removeSection(index: number) {
    this.course.sections.splice(index, 1);
  }

  addLecture(sectionIndex: number) {
    this.course.sections[sectionIndex].lectures.push({ title: '', url: '' });
  }

  removeLecture(sectionIndex: number, lectureIndex: number) {
    this.course.sections[sectionIndex].lectures.splice(lectureIndex, 1);
  }

  isValid(): boolean {
    return this.course.title.trim() !== '' &&
           this.course.headline.trim() !== '' &&
           this.course.description.trim() !== '' &&
           this.course.sections.length > 0 &&
           this.course.sections.every(section =>
             section.title.trim() !== '' &&
             section.lectures.length > 0 &&
             section.lectures.every(lecture => lecture.title.trim() !== '' && lecture.url.trim() !== '')
           );
  }

  createCourse() {
    if (this.isValid()) {
      this.academyService.createCourse(this.course, this.academyId).subscribe(
        data => {
          const navigateEvent = new CustomEvent('navigate-to-container', {
            detail: { path: `academy/${this.academyId}` }
          });
          window.dispatchEvent(navigateEvent);
        },
        err => { console.error('Course creation failed:', err); }
      );
    }
  }

  onFileSelected(event: Event, sectionIndex: number, lectureIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.academyService.uploadFile(formData).subscribe(
        (response: any) => {
          if (response && response.url) {
            this.course.sections[sectionIndex].lectures[lectureIndex].url = response.url;
          }
        },
        error => { console.error('File upload failed:', error); }
      );
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.academyService.uploadFile(formData).subscribe(
        (response: any) => {
          if (response && response.url) {
            this.course.imageUrl = response.url; // Set the course image URL
            const reader = new FileReader();
            reader.onload = () => {
              this.courseImagePreview = reader.result; // Preview the image
            };
            reader.readAsDataURL(file);
          }
        },
        error => { console.error('File upload failed:', error); }
      );
    }
  }
}
