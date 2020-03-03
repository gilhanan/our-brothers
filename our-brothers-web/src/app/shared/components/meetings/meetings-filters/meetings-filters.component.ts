import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewOptions } from '../../view-toggle/view-toggle.component';

@Component({
  selector: 'app-meetings-filters',
  templateUrl: './meetings-filters.component.html',
  styleUrls: ['./meetings-filters.component.scss']
})
export class MeetingsFiltersComponent {

  @Input() view: ViewOptions;
  @Output() viewChange = new EventEmitter<ViewOptions>();

  @Input() filter: string;
  @Output() filterChange = new EventEmitter<string>();

  constructor() { }
}
