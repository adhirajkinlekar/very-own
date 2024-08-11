import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-academy',
  templateUrl: './create-academy.component.html',
  styleUrl: './create-academy.component.scss'
})
export class CreateAcademyComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.myForm.value);
  }

  validateName(str: string){
    return str.replace(/\s+/g, '').toLocaleLowerCase();
  }
}