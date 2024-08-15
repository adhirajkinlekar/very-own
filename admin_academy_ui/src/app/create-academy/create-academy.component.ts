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
  imagePreview: string | ArrayBuffer | null = null;


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

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
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