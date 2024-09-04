
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {
 
    
  AppConstants = {
    route_my_services: "my_services",
    service_type_academy: "academy",
    default_option: '0'
  };

  options = [
    { id: this.AppConstants.default_option, name: 'All', type: 'default' },
    { id: '66c1a81a10ce243407a495ea', name: 'Stephen Teaches Tech', type: this.AppConstants.service_type_academy },
    // { id: 2, name: 'my_streaming' }
  ];

  selectedOption: string = this.AppConstants.default_option;

  private authStatusSubscription!: Subscription
  public readonly isLoggedIn$ = new BehaviorSubject<boolean | null>(null); // value of this BehaviorSubject should never be set to null after initial initialization

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private http: HttpClient ) {

    this.checkLoggedIn();

    this.subscribeToAuthStatus();
  }

  private checkLoggedIn(): void {

    const token = this.getCookie('VERY_OWN_JWT_TOKEN')

    if (token) this.toggleloggedInObservable(true);

    else this.toggleloggedInObservable(false);

  }

  private subscribeToAuthStatus(): void {

    this.authStatusSubscription = this.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) window.location.href = `https://sso.veryown.in/secure/admin/signin`;


    });
  }

  public handleAuthStatus() {

    const isLoggedIn = this.isLoggedIn$.getValue();

    if (isLoggedIn) {

      localStorage.removeItem('JWT_TOKEN');

      this.toggleloggedInObservable(false);
    }

    const redirectTo = isLoggedIn ? '/' : '/sign_in';

    this.router.navigate([redirectTo]);
  }

  public ngOnDestroy(): void {

    if (this.authStatusSubscription) this.authStatusSubscription.unsubscribe();

  }

  public toggleloggedInObservable(value: boolean) {

    this.isLoggedIn$.next(value)
  }


  extractParts(url: string): [string, string] {
    // Split the URL by the '/' character and filter out empty strings and the 'my_services' segment
    const [serviceType = '', serviceId = ''] = url
      .split('/')
      .filter(part => part && part !== this.AppConstants.route_my_services);

    // Return the parts as a tuple
    return [serviceType, serviceId];
  }


  getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
    return null;
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; domain=.veryown.in; samesite=strict`;// ;secure; is rquired for http
    this.toggleloggedInObservable(false);
    // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  };

  getDashboard(): Observable<any> {
    return this.http.get<any>(`https://api-admin.veryown.in/dashboard`);
  }
}



