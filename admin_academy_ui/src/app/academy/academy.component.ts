import { Component } from '@angular/core';
import { AcademyService } from '../academy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.scss'
})
export class AcademyComponent {
  academyId: string | null = null;

  profits: number = 0;
  customers: number = 0;
  courses: any =  [];
  academyName: string = '';
  constructor(private academyService: AcademyService, private route: ActivatedRoute, private router:Router){
  
    this.route.paramMap.subscribe((params: any) => {
      this.academyId = params.get('academyId');
      // Now you can use the id to fetch data or perform other operations
     });

     this.route.params.subscribe((param) => {
     });

    this.academyService.getAcademy(this.academyId).subscribe((data)=>{

      this.academyName = data.academy.academyName;
      this.courses = data.courses;
    },err=>{ 
    })
  }
   
   
  truncateText(text: string, limit: number = 50): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
 
  
  handleClick(){

    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: `academy/${this.academyId}/course/create` }
    });
    
    window.dispatchEvent(navigateEvent);
  }
}
