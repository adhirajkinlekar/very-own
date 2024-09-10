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
  isLoading = false; // New loading state
  errorMessage: string = ''; // Error message state

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
      this.errorMessage = ''; // Clear any previous errors

      this.academyService.createCourse(this.course, this.academyId).subscribe(
        data => {
          const navigateEvent = new CustomEvent('navigate-to-container', {
            detail: { path: `academy/${this.academyId}` }
          });
          window.dispatchEvent(navigateEvent);
        },
        err => { 
          console.error('Course creation failed:', err);
          this.errorMessage = 'There was an issue creating the course. Please try again later.';
         }
      );
    }
  }

  onFileSelected(event: Event, sectionIndex: number, lectureIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Show spinner
      this.isLoading = true;

      // Validate file type (MIME types)
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mkv'];
      if (!validVideoTypes.includes(file.type)) {
        console.error('Invalid file type. Please upload a valid video file (MP4, WebM, Ogg, AVI, or MKV).');
        this.isLoading = false;
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.academyService.uploadFile(formData).subscribe(
        (response: any) => {
          this.isLoading = false; // Hide spinner
          if (response && response.url) {
            this.course.sections[sectionIndex].lectures[lectureIndex].url = response.url;
          }
        },
        error => {
          console.error('File upload failed:', error);
          this.isLoading = false; // Hide spinner on error
        }
      );
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Show spinner
      this.isLoading = true;

      // Validate file type (MIME types)
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validImageTypes.includes(file.type)) {
        console.error('Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, WebP, SVG).');
        this.isLoading = false;
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.academyService.uploadFile(formData).subscribe(
        (response: any) => {
          this.isLoading = false; // Hide spinner
          if (response && response.url) {
            this.course.imageUrl = response.url; // Set the course image URL
            const reader = new FileReader();
            reader.onload = () => {
              this.courseImagePreview = reader.result; // Preview the image
            };
            reader.readAsDataURL(file);
          }
        },
        error => {
          console.error('File upload failed:', error);
          this.isLoading = false; // Hide spinner on error
        }
      );
    }
  }


  getLink() {
    const links = [
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/free-photo-of-anne-eli.jpeg",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-12078486.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-1524620.jpeg",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-16689311.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-17887854.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-3861943.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-3861946.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-3861949.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-3912364.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-4491461.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-5848017.jpeg",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/course/cover/pexels-photo-7214483.webp"
    ];
  
    const randomIndex = Math.floor(Math.random() * links.length);
    return links[randomIndex];
  }
  

  generateRandomCharacter(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  fillWithDummyData() {

    const courseName = this.generateRandomCharacter();

    this.course = {
      title: `Introduction to ${courseName}`,
      headline: `Learn ${courseName} scratch`,
      description: `This course provides a comprehensive introduction to ${courseName}, covering basic to advanced concepts. Starting with an overview of core concepts, participants will gain a strong foundation, including its theoretical underpinnings and practical applications. As the course progresses, learners will explore advanced techniques and strategies, empowering them to confidently tackle real-world challenges. By the end of this course, participants will have acquired the knowledge and skills necessary to effectively apply the skills in various contexts, ensuring they are well-prepared to leverage its full potential in their professional endeavors."`,
      sections: [
        {
          title: `Getting Started`,
          lectures: [
            { title: `Introduction to ${courseName}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/109018-683077133_medium.mp4` },
            { title: `Setting up ${courseName}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/185096-874643413_medium.mp4` }
          ]
        },
        {
          title: `Advanced Topics`,
          lectures: [
            { title: `${this.generateRandomCharacter()} and ${this.generateRandomCharacter()}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/200298-912370118_small.mp4` },
            { title: `Create new ${this.generateRandomCharacter()}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/202693-918730367_medium.mp4` }
          ]
        },
        {
          title: `Why is it needed`,
          lectures: [
            { title: `${this.generateRandomCharacter()} and ${this.generateRandomCharacter()}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/205923_medium.mp4` },
            { title: `Here's why...`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/215471_medium.mp4` }
          ]
        },
        {
          title: `Use cases`,
          lectures: [
            { title: `${this.generateRandomCharacter()} and ${this.generateRandomCharacter()}`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/39010-420224640_medium.mp4` },
            { title: `Use cases...`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/50961-464062995_medium.mp4` }
          ]
        },
        {
          title: `Current trends`,
          lectures: [
            { title: `Local trends`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/68-135732328_medium.mp4` },
            { title: `National trends`, url: `https://storage.googleapis.com/veryown_primary_bucket/1724741940013.mp4` }
          ]
        },
        {
          title: `Bonus`,
          lectures: [
            { title: `Other courses`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/80-135733160_medium.mp4` },
            { title: `Interesting facts`, url: `https://storage.googleapis.com/veryown_primary_bucket/dummy/course/content/69625-531621058_medium.mp4` }, 
          ]
        }
      ]
    };
    const link = this.getLink();
    // Optional: Set a dummy image URL
    this.courseImagePreview = link;
    this.course.imageUrl = link;
  }
}
