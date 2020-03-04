import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
