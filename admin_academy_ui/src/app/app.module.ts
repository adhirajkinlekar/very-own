import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcademyComponent } from './academy/academy.component';
import { CreateAcademyComponent } from './create-academy/create-academy.component';
import { ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,
    AcademyComponent,
    CreateAcademyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule 
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
