import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthApiService } from './api-services/auth-api.service';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public authApi: AuthApiService, 
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user_type = route.data.user_type;
    return new Observable((observer) => {
      this.authApi.check().subscribe(
        user => {
          console.log(user_type +" < "+ user.user_type);
          if(user_type > user.user_type){
            this.router.navigate(['/signin']);
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
