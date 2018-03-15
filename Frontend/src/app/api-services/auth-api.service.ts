import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class AuthApiService {

  constructor(private http: HttpClient, private settings: ApiSettings) {}

  //Creates the API url for the endpoint used for auth
  authUrl:string = this.settings.baseUrl.concat("/auth/");

  //login
  login(form): Observable<object> {
    return this.http
               .post(this.authUrl + "login", form);
  }

  check(): Observable<object> {
    return this.http
               .get(this.authUrl);
  }

  logout(): Observable<object> {
    return this.http
               .delete(this.authUrl);
  }

}
