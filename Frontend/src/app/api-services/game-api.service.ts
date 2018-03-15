import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from './api-settings';

@Injectable()
export class GameApiService {

  constructor(private http: HttpClient, private settings: ApiSettings) {}

  //Creates the API url for the endpoint used for game
  gameUrl:string = this.settings.baseUrl.concat("/game/");

  //vote
  vote(user, vote): Observable<object> {
    let vote = {'vote': vote};
    return this.http
               .post(this.gameUrl + user, vote);
  }

  // Get player
  getPlayer(): Observable<object> {
    return this.http
               .get(this.gameUrl);
  }

}
