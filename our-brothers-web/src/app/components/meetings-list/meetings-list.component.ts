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
}
