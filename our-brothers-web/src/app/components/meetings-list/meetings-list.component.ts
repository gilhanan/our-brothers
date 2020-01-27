import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, Meeting } from 'src/app/model';

interface SortedColumn {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnChanges {

  @Input() meetings: Meeting[];
  @Input() user: User;

  sortedMeetings: Meeting[] = [];
  sortedColumn: SortedColumn;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meetings) {
      this.meetings = this.meetings || [];
      this.sortedMeetings = this.meetings.slice();
      this.sortedColumn = null;
    }
  }

  onColumnClick(column: string) {
    this.upateSortedColumn(column);
    this.sort();
  }

  sortedDirectionClass(column: string) {
    if (this.sortedColumn && this.sortedColumn.column === column) {
      return `sorted-${this.sortedColumn.direction}`;
    }
  }

  sort() {
    this.sortedMeetings = this.meetings.slice();

    if (this.sortedColumn) {
      const column = this.sortedColumn.column;

      this.sortedMeetings.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (column === 'address') {
          aValue = a.address.latitude;
          bValue = b.address.latitude;
        } else if (column === 'bereaveds') {
          aValue = a.bereaveds && (a.bereaveds[0].firstName + a.bereaveds[0].lastName) || '';
          bValue = b.bereaveds && (b.bereaveds[0].firstName + b.bereaveds[0].lastName) || '';
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

  upateSortedColumn(column: string) {
    if (!this.sortedColumn) {
      this.sortedColumn = {
        column,
        direction: 'asc'
      };
    } else if (this.sortedColumn.direction === 'asc') {
      this.sortedColumn = {
        column,
        direction: 'desc'
      };
    } else {
      this.sortedColumn = null;
    }
  }
}
