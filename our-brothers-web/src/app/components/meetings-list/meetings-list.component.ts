import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User, Meeting } from '../../../app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

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

  @Output() joinMeeting = new EventEmitter<Meeting>();

  showFullMeetings = false;
  filteredMeetings: Meeting[] = [];
  sortedMeetings: Meeting[] = [];
  sortedColumn: SortedColumn = {
    column: 'title',
    direction: 'asc'
  };

  constructor(public participationsService: ParticipationsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meetings || changes.user) {
      this.meetings = this.meetings || [];
      this.filter();
      this.sort();
    }
  }

  trackByFn(index: number, item: Meeting) {
    return item.id;
  }

  showFullMeetingsChanged(showFullMeetings: boolean) {
    this.showFullMeetings = showFullMeetings;

    this.filter();
  }

  filter() {
    this.filteredMeetings = this.showFullMeetings ?
      this.meetings.slice() :
      this.meetings.filter(meeting => this.participationsService.isUserCanParticipatingEvent(this.user, meeting));

    this.sort();
  }

  sort() {
    this.sortedMeetings = this.filteredMeetings.slice();

    const column = this.sortedColumn.column;

    this.sortedMeetings.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (this.participationsService.isUserParticipatingEvent(this.user, a)) {
        return -1;
      } else if (this.participationsService.isUserParticipatingEvent(this.user, b)) {
        return 1;
      }

      if (!column) {
        return 1;
      }

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
