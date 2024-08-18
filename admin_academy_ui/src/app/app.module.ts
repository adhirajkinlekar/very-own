import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcademyComponent } from './academy/academy.component';
import { CreateAcademyComponent } from './create-academy/create-academy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
 
@NgModule({
  declarations: [
    AppComponent,
    AcademyComponent,
    CreateAcademyComponent,
    CreatecourseComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule   

    ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // New way
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
