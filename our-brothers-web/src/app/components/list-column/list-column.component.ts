import { Component, Input, Output, EventEmitter, HostListener, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss']
})
export class ListColumnComponent implements OnChanges {

  @Input() field: string;
  @Output() sort = new EventEmitter<void>();

  @HostListener('click', ['$event.target']) onClick() {
    if (!!this.field) {
      this.sort.emit();
    }
  }

  @HostBinding('class.sortable') sortable: boolean = !!this.field;

  sorted: '' | 'asc' | 'desc' = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.sortable = !!this.field;
  }
}
