import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class UserApiService {

  constructor(private http: HttpClient, private settings: ApiSettings) {}

  //Creates the API url for the endpoint used for users
  usersUrl:string = this.settings.baseUrl.concat("/users/");

  //Gets a list of all users
  listUsers(): Observable<object> {
    return this.http
               .get(this.usersUrl);
  }

  //Gets a user by the users id
  getUserById(userId:string): Observable<object> {
    return this.http
               .get(this.usersUrl + userId);
  }

  //Deletes a user by the users id
  deleteUserById(userId:string): Observable<object> {
    return this.http
               .delete(this.usersUrl + userId);
  }

  //Deletes a user by the users id
  updateUserById(userId:string, form): Observable<object> {
    return this.http
               .put(this.usersUrl + userId, form);
  }

  //Deletes a user by the users id
  createUser(form): Observable<object> {
    return this.http
               .post(this.usersUrl, form);
  }

}
