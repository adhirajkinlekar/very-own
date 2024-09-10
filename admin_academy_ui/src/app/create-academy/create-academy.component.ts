import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-create-academy',
  templateUrl: './create-academy.component.html',
  styleUrls: ['./create-academy.component.scss']
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
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

        // Validate file type (MIME types)
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!validImageTypes.includes(file.type)) {
           this.imagePreview = null;
          return;
        }
  
        // Validate file extension as an extra safety check
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !validExtensions.includes(fileExtension)) {
           this.imagePreview = null;
          return;
        }


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
        console.error('Error creating academy:', err);
      })
  }

  validateName(str: string) {
    return str.replace(/\s+/g, '').toLocaleLowerCase();
  }

  fillFormWithRandomData(): void { 
    const randomAcademyName = this.getRandomAcademyName();
    const randomHeadline = `A premier learning institution`;
    const randomDescription = `This is a description for ${randomAcademyName}. It is a premier institution renowned for its exceptional educational services and innovative learning approaches. With a commitment to excellence, it offers a diverse range of programs designed to cater to the needs of students at all levels. The academy boasts a team of highly qualified educators and industry professionals dedicated to delivering top-notch instruction and support. Students benefit from state-of-the-art facilities, cutting-edge resources, and a dynamic curriculum that prepares them for success in their chosen fields. `;
    const randomImageUrl = this.getRandomUrl()

    this.myForm.setValue({
      academyName: randomAcademyName,
      headline: randomHeadline,
      description: randomDescription,
      imageUrl: randomImageUrl
    });

    // Set image preview
    this.imagePreview = randomImageUrl;
  }

  getRandomAcademyName() {
    const academyNames = [
      "Horizon Academy", "Phoenix Scholars", "Summit Learning", "Redwood Academy", "Beacon Hill",
      "Silver Oak", "Nova Academy", "Crestview Academy", "Legacy Academy", "Blue Ridge",
      "Pioneer Academy", "Starlight Academy", "Evergreen Academy", "Unity Scholars", "Valor Academy",
      "Zenith Scholars", "Aspen Grove", "Radiant Academy", "Orion Academy", "Ivywood Academy",
      "Sunrise Academy", "Vanguard Academy", "Solstice Academy", "Harmony Scholars", "Ironwood Academy",
      "Celestial Academy", "Noble Path", "Crimson Peak", "Willow Creek", "Ascend Scholars",
      "Synergy Academy", "Blue Horizon", "Ember Academy", "Sapphire Academy", "Eagle Heights",
      "Lighthouse Academy", "Riverstone Academy", "Summit Crest", "Phoenix Heights", "Monarch Academy",
      "Bright Futures", "Arbor Academy", "Paragon Scholars", "Golden Leaf", "Canyon View",
      "Atlas Academy", "Grandview Academy", "Aurora Scholars", "Zenith Point", "Odyssey Academy",
      "Riverbend Academy", "Silver Creek", "Blue Wave", "Wildwood Academy", "Pinnacle Academy",
      "Radiance Academy", "Summit Ridge", "Iron Gate", "Quest Academy", "Sapphire Scholars",
      "Woodland Academy", "Vanguard Heights", "Bright Horizons", "Westwood Academy", "Noble Heights",
      "Coastal Scholars", "Crescent Ridge", "Legacy Heights", "Sterling Academy", "Suncrest Academy",
      "Summit Edge", "Sapphire Ridge", "Windward Academy", "Harbor Scholars", "Ember Ridge",
      "Tranquil Scholars", "Cascade Academy", "Starcrest Academy", "Liberty Ridge", "Brookstone Academy",
      "Evergreen Scholars", "Alpine Heights", "Brightstone Academy", "Mountainview Academy"
    ];
  
    // Select a random name from the list
    const randomAcademyName = academyNames[Math.floor(Math.random() * academyNames.length)];
  
    // Generate a random 4-digit number
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
  
    // Combine the academy name with the random number
    return `${randomAcademyName}${randomNumber}`;
  }

  getRandomUrl() {

    const urls = [
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-joshua-mcknight-442355-1139311.jpg",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-photo-1007027.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-photo-4778403.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-photo-5088188.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-photo-7594419.webp",
      "https://storage.googleapis.com/veryown_primary_bucket/dummy/academy/pexels-photo-8472998.webp"
    ];
  
    // Select a random URL from the array
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
  
    return randomUrl;
  }
}
