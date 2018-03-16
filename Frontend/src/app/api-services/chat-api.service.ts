import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class ChatApiService {

  constructor(private http: HttpClient, private settings: ApiSettings) {}

  //Creates the API url for the endpoint used for chat
  chatUrl:string = this.settings.baseUrl.concat("/chat/");

  postMessage(chat_id, message): Observable<any> {
    return this.http
               .post(this.chatUrl + chat_id, {"message": message});
  }

  getMessages(chat_id): Observable<any> {
    return this.http
               .get(this.chatUrl + chat_id);
  }

  getchats(): Observable<any> {
    return this.http
               .get(this.chatUrl);
  }

}
