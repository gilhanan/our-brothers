import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Meeting, User } from '../..//model';
import { DataService } from '../../services/data.service';
import { ViewOptions } from '../../components/view-toggle/view-toggle.component';
import { AuthService } from 'src/app/services/auth.service';

const oneWeek = 1000 * 60 * 60 * 24 * 7;

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {
  view: ViewOptions = 'list';
  user: User;
  meetings: Meeting[];
  filteredMeetings: Meeting[];
  hideMapGuide = false;
  mapShowGuide$ = this.authService.user.pipe(
    map(user => !this.hideMapGuide && !(user && user.meetingMapGuideLastVisit && (Date.now() - user.meetingMapGuideLastVisit) < oneWeek))
  );

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    })

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
      this.filterMeetings('');
    });
  }

  filterMeetings(query: string) {
    if (!query || !query.trim()) {
      this.filteredMeetings = this.meetings.slice();
    } else {
      const keywords = query.match(/([^\s]+)/g) || [];
      this.filteredMeetings = this.meetings.filter(meeting =>
        keywords.every(
          keyword =>
            meeting.title.includes(keyword) ||
            meeting.address.formattedAddress.includes(keyword) ||
            (
              meeting.bereaved && ((meeting.bereaved.firstName || '') + (meeting.bereaved.lastName || '')).includes(keyword)
            )
        )
      );
    }
  }

  onMapGuideCompleted() {
    this.hideMapGuide = true;
    if (this.user.id) {
      this.dataService.updateUserData(this.user.id, {
        meetingMapGuideLastVisit: Date.now()
      });
    }
  }
}
