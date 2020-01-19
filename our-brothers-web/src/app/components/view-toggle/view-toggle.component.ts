import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ViewOptions = 'map' | 'list';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss']
})
export class ViewToggleComponent {

  @Input() view: ViewOptions;
  @Output() viewChange = new EventEmitter<ViewOptions>();

  constructor() { }

}
