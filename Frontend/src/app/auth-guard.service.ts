import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthApiService } from './api-services/auth-api.service';

import { Observable, Subject } from "rxjs/Rx";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authApi: AuthApiService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const user_type = route.data.user_type;

    return new Observable((observer) => {
      this.authApi.check().subscribe(
        user => {
          if(user_type > user.user_type){
            this.router.navigate(['/']);
            observer.next(false);
          }else{
            observer.next(true);
          }
        },
        err => {
            this.router.navigate(['/signin']);
            observer.next(false);
        }
      );
    });
  }

}
