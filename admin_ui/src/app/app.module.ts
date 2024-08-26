import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ServiceTypesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
