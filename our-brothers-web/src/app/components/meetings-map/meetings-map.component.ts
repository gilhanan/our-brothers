import { Component, Input, TrackByFunction, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../../model';
import { MapRestriction } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-meetings-map',
  templateUrl: './meetings-map.component.html',
  styleUrls: ['./meetings-map.component.scss']
})
export class MeetingsMapComponent implements OnInit {

  @Input() meetings: Meeting[];
  @Input() isCenterCurrentLocation = true;

  mapLatitude = 31.672600;
  mapLongitude = 35.077028;
  mapZoom = 8;
  restriction: MapRestriction = {
    latLngBounds: {
      east: 36,
      north: 33.5,
      south: 29.4,
      west: 34
    }
  }

  constructor() {
  }

  trackByFn: TrackByFunction<Meeting> = (index, item) => {
    return item.id;
  }

  ngOnInit(): void {
    if (this.isCenterCurrentLocation) {
      this.centerCurrentLocation();
    }
  }

  centerCurrentLocation() {
    this.getLocation().subscribe((location) => {
      // Israel borders
      if (location.longitude > 34 && location.longitude < 36 &&
        location.latitude > 29 && location.latitude < 33.4) {
        this.mapLongitude = location.longitude;
        this.mapLatitude = location.latitude;
        this.mapZoom = 11;
      }
    }, () => {
      // Failed to get current location
    });
  }

  private getLocation(): Observable<{ latitude: number, longitude: number }> {
    const GEOLOCATION_ERRORS = [
      'Browser does not support location services',
      'You have rejected access to your location',
      'Unable to determine your location',
      'Service timeout has been reached'
    ];

    return Observable.create((observer) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          (error) => observer.error(GEOLOCATION_ERRORS[+error.code]));
      } else {
        observer.error(GEOLOCATION_ERRORS[0]);
      }
    });
  }
}
