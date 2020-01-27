import { Component, OnInit } from '@angular/core';

import { Meeting } from '../..//model';
import { DataService } from '../../services/data.service';
import { ViewOptions } from '../../components/view-toggle/view-toggle.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {

  view: ViewOptions = 'list';
  user$ = this.dataService.getCurrentUser();
  meetings: Meeting[];
  filteredMeetings: Meeting[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
      this.filterMeetings('');
    });
  }

  filterMeetings(query: string) {
    if (!query || !query.trim()) {
      this.filteredMeetings = this.meetings.slice();
    } else {
      const keywords = query.split(/( )+/);
      this.filteredMeetings = this.meetings.filter(meeting =>
        keywords.every(keyword =>
          (meeting.title.includes(keyword) ||
            meeting.address.formattedAddress.includes(keyword) ||
            (meeting.bereaveds && meeting.bereaveds.some(bereaved => bereaved.firstName.includes(keyword) || bereaved.lastName.includes(keyword))))
        ));
    }
  }
}
