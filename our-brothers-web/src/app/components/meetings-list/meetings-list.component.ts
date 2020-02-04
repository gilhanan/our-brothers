import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, Meeting } from '../../../app/model';

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
  sortedColumn: SortedColumn = {
    column: 'title',
    direction: 'asc'
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meetings) {
      this.meetings = this.meetings || [];
      this.sort();
    }
  }

  trackByFn(index: number, item: Meeting) {
    return item.id;
  }

  sort() {
    this.sortedMeetings = this.meetings.slice();

    if (this.sortedColumn.column) {
      const column = this.sortedColumn.column;

      this.sortedMeetings.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (column === 'address') {
          aValue = a.address.latitude;
          bValue = b.address.latitude;
        } else if (column === 'bereaveds') {
          aValue = a.bereaved && (a.bereaved.firstName + a.bereaved.lastName) || '';
          bValue = b.bereaved && (b.bereaved.firstName + b.bereaved.lastName) || '';
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
