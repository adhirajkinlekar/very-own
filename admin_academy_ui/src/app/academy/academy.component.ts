import { Component } from '@angular/core';
import { AcademyService } from '../academy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.scss'
})
export class AcademyComponent {
  academyId: string | null = null;

  profits: number = 0;
  customers: number = 0;
  courses: any = {};
  academyName: string = '';
  constructor(private academyService: AcademyService, private route: ActivatedRoute){

    this.route.paramMap.subscribe((params: any) => {
      this.academyId = params.get('academyId');
      // Now you can use the id to fetch data or perform other operations
     });

    this.academyService.getAcademy(this.academyId).subscribe((data)=>{

      this.academyName = data.academy.academyName;
      this.courses = data.courses;

      console.log({courses:this.courses})

    },err=>{ 
    })
  }
   
  handleClick(){

    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `my_services/academy/${this.academyId}/course/create` }
    });
    
    window.dispatchEvent(navigateEvent);
  }
}
