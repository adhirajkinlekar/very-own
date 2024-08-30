import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { 
  totalRevenue: number = 0; // Example data, replace with actual
  enrolledServices: Array<string> = [];
  loading: boolean = true;


  constructor(private service: AppService){

    
  }

  getDashboard(){
     this.service.getDashboard().subscribe(data=>{ 
      this.enrolledServices = data.enrolledServices;
      this.loading = false;
     },err=>{
      this.loading = false;

      })
    }

  ngOnInit(): void {
    this.getDashboard();
  }

} 