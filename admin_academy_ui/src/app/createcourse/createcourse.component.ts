
import { Component } from '@angular/core';

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
}
  
@Component({
  selector: 'app-createcourse',
  template: `
    <h2>Create a New Course</h2>
    <div>
      <label for="courseTitle">Course Title:</label>
      <input id="courseTitle" [(ngModel)]="course.title" required>
    </div>

     <div>
      <label for="courseTitle">Course Headline:</label>
      <input id="courseHeadline" [(ngModel)]="course.headline" required>
    </div>

     <div>
      <label for="courseTitle">Course Description:</label>
      <input id="courseDescription" [(ngModel)]="course.description" required>
    </div>

    <h3>Sections</h3>
    <div *ngFor="let section of course.sections; let i = index">
      <h4>Section {{i + 1}}</h4>
      <div style="margin-top:10px; margin-bottom:10px"> 
      <button (click)="removeSection(i)">Remove Section</button>
      </div>
      <input [(ngModel)]="section.title" placeholder="Section Title" required>

      <h5>Lectures</h5>
      <div *ngFor="let lecture of section.lectures; let j = index">
        <input [(ngModel)]="lecture.title" placeholder="Lecture Title" required>
        <input  style="margin-top:10px" type="file" [(ngModel)]="lecture.url" placeholder="Lecture Title" required>

        <button (click)="removeLecture(i, j)" style="margin-top:10px">Remove Lecture</button>
      </div>
      <div style="padding-top:20px">
       <button (click)="addLecture(i)">Add Lecture</button>
       </div>
    </div>
    <div style="padding-top:20px">
        <button (click)="addSection()">Add Section</button>

    </div>
    <div style="padding-top:20px">
        <button (click)="createCourse()" [disabled]="!isValid()">Create Course</button>

    </div>
  `,
  styles: [`
    .course-creation {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h2, h3, h4, h5 {
      color: #333;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .sections {
      margin-top: 20px;
    }
    .section {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 15px;
    }
    .lectures {
      margin-left: 20px;
    }
    .lecture {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .lecture .form-group {
      flex-grow: 1;
      margin-right: 10px;
      margin-bottom: 0;
    }
    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})


export class CreatecourseComponent {
  course: Course = {
    title: '',
    headline: '',
    description: '',
    sections: [{
      title: '', lectures: [{
        title: '',
        url: ''
      }]
    }]
  };

  addSection() {
    this.course.sections.push({ title: '', lectures: [{
      title: '',
      url: ''
    }] });
  }

  removeSection(index: number) {
    this.course.sections.splice(index, 1);
  }

  addLecture(sectionIndex: number) {
    this.course.sections[sectionIndex].lectures.push({
      title: '',
      url: ''
    });
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
      console.log('Course created:', this.course);
      // Here you would typically send the course data to your backend

      const navigateEvent = new CustomEvent('navigate-to-container', {
        detail: { path: 'my_services/academy/1' }
      });
      
      window.dispatchEvent(navigateEvent);
    }
  }
}


