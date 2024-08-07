import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  options = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Academy' },
    { id: 3, name: 'Streaming' }
  ];

  selectedOption: number = 1;

  onChange(selected: any) {
    console.log('Selected option:', selected);
  }
}