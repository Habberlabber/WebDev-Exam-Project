import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class BookmarkApiService {

  constructor(private http: HttpClient, private settings: ApiSettings) {}

  //Creates the API url for the endpoint used for bookmark
  bookmarkUrl:string = this.settings.baseUrl.concat("/bookmark/");

  //add mark 
  addBookmark(user): Observable<any> {
    return this.http
               .post(this.bookmarkUrl + user, null);
  }

  // Get marks
  getBookmarks(): Observable<any> {
    return this.http
               .get(this.bookmarkUrl);
  }

}
