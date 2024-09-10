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

      // Validate file type (MIME types)
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mkv'];
      if (!validVideoTypes.includes(file.type)) {
        console.error('Invalid file type. Please upload a valid video file (MP4, WebM, Ogg, AVI, or MKV).');
        return;
      }

      // Validate file extension as an extra safety check
      const validExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mkv'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        console.error('Invalid file extension. Please upload a valid video file with an appropriate extension (MP4, WebM, Ogg, AVI, or MKV).');
        return;
      }

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

      // Validate file type (MIME types)
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validImageTypes.includes(file.type)) {
        this.courseImagePreview = null;
        return;
      }

      // Validate file extension as an extra safety check
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        this.courseImagePreview = null;
        return;
      }

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

  fillWithDummyData() {
    this.course = {
      title: `Introduction to ${Math.floor(Math.random() * 1000)}`,
      headline: `Learn ${Math.floor(Math.random() * 1000)} scratch`,
      description: `This course provides a comprehensive introduction to ${Math.floor(Math.random() * 1000)}, covering basic to advanced concepts.`,
      sections: [
        {
          title: `Getting Started with ${Math.floor(Math.random() * 1000)}`,
          lectures: [
            { title: `Introduction to ${Math.floor(Math.random() * 1000)}`, url: `https://storage.googleapis.com/veryown_primary_bucket/1724741926017.mp4` },
            { title: `Setting up ${Math.floor(Math.random() * 1000)}`, url: `https://storage.googleapis.com/veryown_primary_bucket/1724741940013.mp4` }
          ]
        },
        {
          title: `Advanced ${Math.floor(Math.random() * 1000)} Topics`,
          lectures: [
            { title: `${Math.floor(Math.random() * 1000)} and ${Math.floor(Math.random() * 1000)}`, url: `https://storage.googleapis.com/veryown_primary_bucket/1724781950981.mp4` },
            { title: `Create new ${Math.floor(Math.random() * 1000)}`, url: `https://storage.googleapis.com/veryown_primary_bucket/1724741940013.mp4` }
          ]
        }
      ]
    };
    // Optional: Set a dummy image URL
    this.courseImagePreview = 'https://storage.googleapis.com/veryown_primary_bucket/pexels-photo-4491461.webp';
    this.course.imageUrl = 'https://storage.googleapis.com/veryown_primary_bucket/pexels-photo-4491461.webp';
  }
}
