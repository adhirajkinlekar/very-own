import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  AppConstants = {
    route_my_services : "my_services",
    service_type_academy: "academy",
    default_option: 0
  };

  options = [
    { id: this.AppConstants.default_option, name: 'All', type: 'default' },
    { id: 1, name: 'my_academy', type: this.AppConstants.service_type_academy},
 // { id: 2, name: 'my_streaming' }
  ];

  selectedOption: number = this.AppConstants.default_option;

  constructor() { }


  

  extractParts(url: string): [string, string] {
    // Split the URL by the '/' character and filter out empty strings and the 'my_services' segment
    const [serviceType = '', serviceId = ''] = url
      .split('/')
      .filter(part => part && part !== this.AppConstants.route_my_services);
  
    // Return the parts as a tuple
    return [serviceType, serviceId];
  }
  

}
