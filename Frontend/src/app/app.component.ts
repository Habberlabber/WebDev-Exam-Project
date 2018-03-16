import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GeoLocationService } from './services/geo-location.service';
import { NotificationService } from './services/notification.service';
import { AuthApiService } from './api-services/auth-api.service';

declare var UIkit: any;

@Component({
  selector: 'WD-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [GeoLocationService, AuthApiService, NotificationService]
})
export class AppComponent implements OnInit {
  constructor(
    private geoS: GeoLocationService,
    private notiS: NotificationService,
    private authApi: AuthApiService,
    private router: Router
  ){}

  ngOnInit() {
    console.log('Test:');
    this.geoS.getCurrentLocation();
    this.notiS.showNots();
  }

  doLogout(){
    this.authApi.logout().subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/signin']);
      }
    );
  }

}
