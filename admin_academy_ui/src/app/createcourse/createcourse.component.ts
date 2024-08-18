
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
}
  
@Component({
  selector: 'app-createcourse', 
  templateUrl: './createcourse.component.html',
  styleUrl: "./createcourse.component.scss"
})


export class CreatecourseComponent {
  academyId: string | null = null;

  constructor(private academyService: AcademyService,  private route: ActivatedRoute){

    this.route.paramMap.subscribe((params: any) => {
      this.academyId = params.get('academyId');
      // Now you can use the id to fetch data or perform other operations
     });


  };
  
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
      this.academyService.createCourse(this.course, this.academyId).subscribe(data=>{

        const navigateEvent = new CustomEvent('navigate-to-container', {
          detail: { path: `my_services/academy/${this.academyId}` }
        });
        
        window.dispatchEvent(navigateEvent);
      },
    err=>{

    })
    }
  }
}


