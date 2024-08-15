import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-academy',
  templateUrl: './create-academy.component.html',
  styleUrl: './create-academy.component.scss'
})
export class CreateAcademyComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  onSubmit(): void {
     
    const navigateEvent = new CustomEvent('navigate-to-container', {
      detail: { path: 'my_services/academy/1' }
    });
    
    window.dispatchEvent(navigateEvent);

    // this.router.navigateByUrl('my_services/academy/1') check if it works direcly

  }

  validateName(str: string){
    return str.replace(/\s+/g, '').toLocaleLowerCase();
  }
}