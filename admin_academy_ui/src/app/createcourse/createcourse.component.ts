
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
  templateUrl: './createcourse.component.html',
  styleUrl: "./createcourse.component.scss"
})


export class CreatecourseComponent {
  course: Course = {
    title: '',
    headline: '',
    description: '',
    sections: [ ]
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


