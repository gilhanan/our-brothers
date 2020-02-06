import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-free-text-filter',
  templateUrl: './free-text-filter.component.html',
  styleUrls: ['./free-text-filter.component.scss']
})
export class FreeTextFilterComponent implements OnInit {

  @Input() filter: string;
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
