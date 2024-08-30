import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-create-academy',
  templateUrl: './create-academy.component.html',
  styleUrl: './create-academy.component.scss'
})
export class CreateAcademyComponent {

  myForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder, private router: Router, private academyService: AcademyService) {

    // Initialize the form group here
    this.myForm = this.fb.group({
      academyName: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['',  Validators.required],
      headline: ['', Validators.required],
      // publicId: ['', Validators.required]
    });
    // instructorTitle should be part of Admin
  }

  ngOnInit(): void {
    // Any initialization logic
  }

 

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.myForm.patchValue({ image: file });
      this.myForm.get('image')?.updateValueAndValidity();

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Upload image
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.academyService.uploadFile(formData).subscribe(response => {
      console.log('File uploaded successfully:', response);

      this.myForm.patchValue({ imageUrl: response.url });

    }, error => {
      console.error('File upload failed:', error);
    });
  }



  onSubmit(): void {

    this.academyService.createAcademy(
      {
        academyName: this.myForm.value.academyName,
        publicId: this.validateName(this.myForm.value.academyName),
        description: this.myForm.value.description,
        headline: this.myForm.value.headline,
        imageUrl: this.myForm.value.imageUrl,
      }).subscribe((data) => {

        const navigateEvent = new CustomEvent('navigate-to-container', {
          detail: { path: `my_services/academy/${data._id}` }
        });

        window.dispatchEvent(navigateEvent);
      }, err => {

      })



    // this.router.navigateByUrl('my_services/academy/1') check if it works direcly

  }

  validateName(str: string) {
    return str.replace(/\s+/g, '').toLocaleLowerCase();
  }
}