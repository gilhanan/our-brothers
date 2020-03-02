import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Meeting, User } from 'models';
import { DataService, MEMORIAL_YEAR } from '../../services/data.service';
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
  year = MEMORIAL_YEAR;

  constructor(
    private router: Router,
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
      this.dataService.updateUserMapGuideLastVisit(this.user.id);
    }
  }

  onJoinMeeting(meeting: Meeting) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (this.user.role === 'bereaved') {
        this.dataService.bereavedRegisterHost(this.user, meeting).subscribe((result) => {
          if (result) {
            window.alert('שובצת בהצלחה!');
            this.router.navigate([`meetings/${this.year}/${meeting.hostId}/${meeting.id}`]);
          }
        })
      } else {
        const accompanies = this.getAccompanies();

        this.dataService
          .participateRegisterHost(this.user, meeting, accompanies)
          .subscribe(result => {
            if (result) {
              window.alert('שובצת בהצלחה!');
              this.router.navigate([`meetings/${this.year}/${meeting.hostId}/${meeting.id}`]);
            }
          });
      }
    }
  }

  getAccompanies(): number {
    let accompaniesAnswer = window.prompt('האם יגיעו איתך אנשים נוספים?', '0');

    let number = Number.parseInt(accompaniesAnswer);

    while (!(!Number.isNaN(number) && number >= 0 && number <= 7)) {
      accompaniesAnswer = window.prompt('נא להזין מספר משתתפים בין 0 ל-7', '0');
      number = Number.parseInt(accompaniesAnswer);
    }

    return number;
  }
}
