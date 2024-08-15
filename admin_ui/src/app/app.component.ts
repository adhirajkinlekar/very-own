import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin_ui'; 

  constructor(private router: Router, private service: AppService) {

    window.addEventListener('navigate-to-container', (event: Event) => {
      const customEvent = event as CustomEvent;
      const path = customEvent.detail.path;

      this.router.navigate([path]);
    }); 

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
       const route = event.urlAfterRedirects  

      if(route.includes( this.service.AppConstants.route_my_services)){

        const [serviceType, serviceId] = this.service.extractParts(route);

        const option = this.service.options.find(x=> x.type == serviceType && x.id == parseInt(serviceId))

        console.log([option, {options: this.service.options}])

        if(option) this.service.selectedOption = option.id;

        else this.service.selectedOption = this.service.AppConstants.default_option
      }
    });
  }
}
