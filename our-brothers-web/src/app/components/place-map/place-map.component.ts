import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MapRestriction } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-place-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.scss']
})
export class PlaceMapComponent {

  @Input() latitude: number;
  @Input() longitude: number;
}
