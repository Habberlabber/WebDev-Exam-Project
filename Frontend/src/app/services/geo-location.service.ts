import { Injectable } from '@angular/core';

@Injectable()
export class GeoLocationService {

  constructor() { }

  getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.savePosition, this.error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  savePosition(position) {
    console.log("location::")
    console.log(position.coords.latitude +  " - " + position.coords.longitude);
    
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

}
