import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Meeting } from 'models';
import { DataService } from '../../shared/services/data.service';
import { MeetingForm } from '../host-form/host-form.component';

@Component({
  selector: 'app-edit-host-page',
  templateUrl: './edit-host-page.component.html',
  styleUrls: ['./edit-host-page.component.scss']
})
export class EditHostPageComponent implements OnInit, OnDestroy {
  public loadingMeeting = true;
  public meeting: Meeting;
  public year: number;

  private getMeeting$: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const { hostId, meetingId, memorialYear } = params;

      this.year = memorialYear;

      if (this.getMeeting$) {
        this.getMeeting$.unsubscribe();
      }

      this.getMeeting$ = this.dataService.getMeeting(hostId, meetingId).subscribe(meeting => {
        this.loadingMeeting = false;
        return (this.meeting = meeting);
      });
    });
  }

  onUpdateMeeting(meetingDetails: MeetingForm) {
    this.dataService.updateMeeting(this.meeting.hostId, this.meeting.id, meetingDetails, this.year).subscribe(
      () => {
        this.toastr.success('עודכן מפגש בהצלחה!');
        this.router.navigate([`meetings/${this.year}/${this.meeting.hostId}/${this.meeting.id}`]);
      },
      () => {
        this.toastr.error('שגיאה - לא ניתן לעדכן מפגש. נא ליצור קשר.');
      }
    );
  }

  ngOnDestroy() {
    if (this.getMeeting$) {
      this.getMeeting$.unsubscribe();
    }
  }
}
