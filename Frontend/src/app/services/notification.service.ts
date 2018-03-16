import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiSettings } from '../api-services/api-settings';

declare var UIkit: any;

@Injectable()
export class NotificationService {
  notiSound = new Audio();

  constructor(private http: HttpClient, private settings: ApiSettings) { }

  notiUrl:string = this.settings.baseUrl.concat("/notifications/");

  getNots(): Observable<any> {
    return this.http
    .get(this.notiUrl);
  }

  showNots(){
    this.notiSound.src = "../../assets/noti.mp3";
    this.notiSound.load();

    this.getNots().subscribe(
      res => {
        for(let n of res){
          UIkit.notification(n.message,  { status: 'primary', pos: 'top-right', timeout: 5000 });
          this.deskNoti(n.message);
          this.notiSound.play();
        }
        setTimeout(
          ()=> {
            this.showNots()
          },
          1000*60);
      },
      err => {
        console.log(err);
      }
      );
  }

  deskNoti(message){
    if (!Notification) {
      console.log('Desktop notifications not available in your browser.'); 
      return false;
    }
    Notification.requestPermission();
    let notification = new Notification('Woop Woop', {
      icon: '../../assets/logo.png',
      body: message
    });

    notification.onclick = function () {
      window.open("http://google.com");      
    };

  }

}
