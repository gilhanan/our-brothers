/// <reference types="@types/googlemaps" />

import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Address } from 'models';

@Component({
  selector: 'app-places-select',
  templateUrl: './places-select.component.html',
  styleUrls: ['./places-select.component.scss']
})
export class PlacesSelectComponent implements AfterViewInit {

  @Input() types: string[];
  @Input() placeholder: string;
  @Input() invalid: boolean;

  @Output() change: EventEmitter<Address> = new EventEmitter();
  @ViewChild('palcesInput') addresstext: ElementRef<HTMLInputElement>;

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
        {
          componentRestrictions: { country: ['IL', 'PS'] },
          types: this.types.slice()
        });

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();

        const parsedAddress: Address = {
          formattedAddress: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        }

        this.change.emit(parsedAddress);
      });
    });
  }
}
