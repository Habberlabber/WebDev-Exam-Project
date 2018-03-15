import { Injectable } from '@angular/core';
import { UserApiService } from '../api-services/user-api.service';

@Injectable()
export class GeoLocationService {

  constructor(private userAPI: UserApiService) { }

  getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.savePosition.bind(this), this.error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  savePosition(position) {
    console.log("location::")
    console.log(position.coords.latitude +  " - " + position.coords.longitude);

    let location = {
      location: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    };

    this.userAPI.updateCurrentUser(location).subscribe(res => {
      console.log("location saved");
      console.log(res);
      setTimeout(() => {
        this.getCurrentLocation();
      }, 1000*60*5);
    });
    
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

}
