import { Subject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewOptions } from '../view-toggle/view-toggle.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-meetings-filters',
  templateUrl: './meetings-filters.component.html',
  styleUrls: ['./meetings-filters.component.scss']
})
export class MeetingsFiltersComponent implements OnInit {

  @Input() view: ViewOptions;
  @Output() viewChange = new EventEmitter<ViewOptions>();

  @Output() filterChange = new EventEmitter<string>();

  filterDebounce$ = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.filterDebounce$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((value) => this.filterChange.emit(value));
  }

}
