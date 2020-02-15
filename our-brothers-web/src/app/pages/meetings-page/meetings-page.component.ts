import { Component, OnInit } from '@angular/core';

import { Meeting, User } from '../..//model';
import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';

const oneWeek = 1000 * 60 * 60 * 24 * 7;

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {
  user: User;
  loadingUser = true;
  meetings: Meeting[];
  mapShowGuide = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.loadingUser = false;

      if (!this.mapShowGuide && !(user && user.meetingMapGuideLastVisit && (Date.now() - user.meetingMapGuideLastVisit) < oneWeek)) {
        this.mapShowGuide = true;
      }
    })

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onMapGuideCompleted() {
    this.mapShowGuide = true;
    if (this.user && this.user.id) {
      this.dataService.updateUserData(this.user.id, {
        meetingMapGuideLastVisit: Date.now()
      });
    }
  }

  onJoinMeeting(meeting: Meeting) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (this.user.role === 'bereaved') {
        this.dataService.bereavedRegisterHost(this.user, meeting).subscribe((result) => {
          if (result) {
            window.alert('שובצת בהצלחה!');
          }
        })
      }
    }
  }
}
