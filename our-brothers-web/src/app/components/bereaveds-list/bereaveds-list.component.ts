import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/model';
import { SortedColumn } from '../list-header/list-header.component';


@Component({
  selector: 'app-bereaveds-list',
  templateUrl: './bereaveds-list.component.html',
  styleUrls: ['./bereaveds-list.component.scss']
})
export class BereavedsListComponent implements OnChanges {

  @Input() bereaveds: User[];
  sortedBereaveds: User[] = [];

  sortedColumn: SortedColumn = {
    column: 'name',
    direction: 'asc'
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bereaveds) {
      this.bereaveds = this.bereaveds || [];
      this.sort();
    }
  }

  sort() {
    this.sortedBereaveds = this.bereaveds.slice();

    if (this.sortedColumn.column) {
      const column = this.sortedColumn.column;

      this.sortedBereaveds.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (column === 'name') {
          aValue = (a.profile && (a.profile.firstName + a.profile.lastName)) || '';
          bValue = (b.profile && (b.profile.firstName + b.profile.lastName)) || '';
        } else {
          aValue = a[column] || '';
          bValue = b[column] || '';
        }

        if (this.sortedColumn.direction === 'desc') {
          [aValue, bValue] = [bValue, aValue];
        }

        return aValue.toString().localeCompare(bValue);
      });
    }
  }
}
