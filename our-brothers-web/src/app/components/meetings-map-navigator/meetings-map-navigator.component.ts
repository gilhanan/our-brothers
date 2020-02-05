import { Component, Output, EventEmitter } from '@angular/core';

export type NavigationDirection = 'north' | 'middle' | 'south';

@Component({
  selector: 'app-meetings-map-navigator',
  templateUrl: './meetings-map-navigator.component.html',
  styleUrls: ['./meetings-map-navigator.component.scss']
})
export class MeetingsMapNavigatorComponent {

  @Output() navigate = new EventEmitter<NavigationDirection>();

  constructor() { }

}
