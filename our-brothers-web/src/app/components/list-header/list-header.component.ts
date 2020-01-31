import { Component, Output, EventEmitter, QueryList, ContentChildren, AfterContentInit, Input } from '@angular/core';
import { ListColumnComponent } from '../list-column/list-column.component';

export interface SortedColumn {
  column: string;
  direction: 'asc' | 'desc';
}

const SortedColumnInitialValue: SortedColumn = {
  column: '',
  direction: 'asc'
}

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements AfterContentInit {

  @Input('sort') _sort: SortedColumn = SortedColumnInitialValue;
  @Output() sortChange = new EventEmitter<SortedColumn>();

  @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;

  get sort(): SortedColumn {
    return this._sort;
  }

  set sort(value: SortedColumn) {
    this._sort = value;
    this.updateColumnsSorting();
    this.sortChange.emit(this.sort);
  }

  constructor() { }

  ngAfterContentInit(): void {
    this.listenColumnsClicks();
    this.updateColumnsSorting();
  }

  onColumnClick(column: string) {
    if (this.sort.column === column) {
      if (this.sort.direction === 'desc') {
        this.sort = SortedColumnInitialValue;
      } else {
        this.sort = {
          column,
          direction: 'desc'
        };
      }
    } else {
      this.sort = {
        column,
        direction: 'asc'
      };
    }
  }

  listenColumnsClicks() {
    this.columns.toArray().forEach(column => column.sort.subscribe(() => this.onColumnClick(column.field)));
  }

  updateColumnsSorting() {
    this.columns.toArray().forEach(column => {
      if (column.field === this.sort.column) {
        column.sorted = this.sort.direction;
      } else {
        column.sorted = '';
      }
    });
  }
}
