import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Meeting, User } from '../..//model';
import { DataService } from '../../services/data.service';
import { ViewOptions } from '../../components/view-toggle/view-toggle.component';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

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
  mapShowGuide = false;
  mapShowLegend = false;
  filter: string = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;

      if (!(user && user.meetingMapGuideLastVisit && (Date.now() - user.meetingMapGuideLastVisit) < oneWeek)) {
        this.mapShowGuide = true;
      } else {
        this.mapShowLegend = true;
      }
    })

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
      this.filterMeetings();
    });
  }

  filterMeetings() {
    this.filteredMeetings = this.utilsService.filteringMeetings(this.meetings, this.filter);
  }

  onMapGuideCompleted() {
    this.mapShowGuide = true;
    this.mapShowLegend = true;
    if (this.user && this.user.id) {
      this.dataService.updateUserData(this.user.id, {
        meetingMapGuideLastVisit: Date.now()
      });
    }
  }

  onJoinMeeting({ user, meeting }: { user: User, meeting: Meeting }) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (user.role === 'bereaved') {
        this.dataService.bereavedRegisterHost(user, meeting).subscribe((result) => {
          if (result) {
            window.alert('שובצת בהצלחה!');
          }
        })
      }
    }
  }
}
