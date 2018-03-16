import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer, point } from 'leaflet';
import * as L from 'leaflet';

import { UserApiService } from '../../api-services/user-api.service';

@Component({
  selector: 'WD-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  userGroupArray = [];
  group;
  options;
  constructor(private userApi: UserApiService) { }

  ngOnInit() {
    this.userApi.listUsers().subscribe(users => {
      // Return users

      for(let u of users){
        if(u.location){
          let img = u.images ? 'http://rednit.habberdesign.eu/src/images/' + u.images[0] : 'leaflet/marker-icon.png';
          let uMarker = marker([ u.location.lat, u.location.lon ], {
            icon: icon({
              iconSize: [ 50, 50 ],
              iconAnchor: [ 25, 25 ],
              iconUrl: img
            })
          });
          this.userGroupArray.push(uMarker);
        }
      }

      this.group = L.featureGroup(this.userGroupArray);

      this.options = {
        layers: [ this.googleMaps, this.group ],
        zoom: 7,
        center: latLng([ 46.879966, -121.726909 ])
      };

    });
  }

  // Define our base layers so we can reference them multiple times
  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });
  googleHybrid = tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });


  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'Google Hybrid': this.googleHybrid
    }
  };

  onMapReady(map) {
    map.fitBounds(this.group.getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
  }


}
