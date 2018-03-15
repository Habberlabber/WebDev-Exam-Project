import { Component } from '@angular/core';

import { GeoLocationService } from './services/geo-location.service';

declare var UIkit: any;

@Component({
  selector: 'WD-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [GeoLocationService]
})
export class AppComponent implements OnInit {
  constructor(private geoS: GeoLocationService){}

  ngOnInit() {
    console.log('Test:');
    this.geoS.getCurrentLocation();
  }

  title = 'WD';
  showAlert(): void {
    UIkit.modal.alert('UIkit alert!');
  }
}
