import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MeetingAudience, User, Meeting } from 'models';
import { MEMORIAL_YEAR, MIN_DATE, MAX_DATE } from '../../shared/constants';
import { UtilsService } from '../../shared/services/utils.service';
import { HostInputOption } from '../host-input-options/host-input-options.component';

export interface MeetingForm {
  title: string;
  date: string;
  hour: string;
  address: {
    formattedAddress: string;
    latitude: number;
    longitude: number;
    notes: string;
  };
  capacity: number;
  invited: boolean;
  accessibility: boolean;
  media: boolean;
  reviewable: boolean;
  audience: MeetingAudience;
}

@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.scss']
})
export class HostFormComponent implements OnInit {
  @Input() user: User;
  @Input() meeting: Meeting;

  @Output() public submitMeetingDetailsPage = new EventEmitter<MeetingForm>();

  public form: FormGroup;
  public formInvalid = false;
  public audienceOptions: HostInputOption[];

  public minDate = MIN_DATE.toISOString().split('T')[0];
  public maxDate = MAX_DATE.toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private utilsService: UtilsService) {}

  ngOnInit() {
    this.audienceOptions = [
      {
        text: this.utilsService.meetingAudienceLabels.all,
        value: MeetingAudience.all
      },
      {
        text: this.utilsService.meetingAudienceLabels.schoolStudents,
        value: MeetingAudience.schoolStudents
      },
      {
        text: this.utilsService.meetingAudienceLabels.youthMovement,
        value: MeetingAudience.youthMovement
      },
      {
        text: this.utilsService.meetingAudienceLabels.soldiers,
        value: MeetingAudience.soldiers
      },
      {
        text: this.utilsService.meetingAudienceLabels.militaryPreparation,
        value: MeetingAudience.militaryPreparation
      },
      {
        text: this.utilsService.meetingAudienceLabels.students,
        value: MeetingAudience.students
      }
    ];

    this.form = this.fb.group({
      title: [null, Validators.required],
      date: [null, [Validators.required, this.utilsService.validateMeetingDate]],
      hour: [null, Validators.required],
      address: this.fb.group({
        formattedAddress: [null, Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
        notes: [null, [Validators.maxLength(200)]]
      }),
      capacity: [null, [Validators.required, Validators.min(2), Validators.max(300)]],
      invited: [null, Validators.required],
      accessibility: [null, Validators.required],
      media: [null, Validators.required],
      reviewable: [null, Validators.required],
      audience: [null, Validators.required]
    });

    if (this.meeting) {
      const localDate = new Date(this.meeting.date);

      const date = new Date(
        Date.UTC(
          localDate.getUTCFullYear(),
          localDate.getUTCMonth(),
          localDate.getUTCDate(),
          localDate.getUTCHours(),
          localDate.getUTCMinutes(),
          localDate.getUTCSeconds()
        )
      );

      this.form.reset({
        ...this.meeting,
        date: date.toISOString().split('T')[0],
        hour: date.toTimeString().substring(0, 5)
      } as MeetingForm);
    } else {
      this.form.reset({
        title: 'משפחת ' + this.user.profile.lastName,
        date: new Date(Date.UTC(MEMORIAL_YEAR, 3, 26)).toISOString().split('T')[0],
        hour: '20:00',
        capacity: 30
      });
    }

    this.form.valueChanges.subscribe(() => {
      this.formInvalid = false;
    });
  }

  get title() {
    return this.form.get('title');
  }

  get date() {
    return this.form.get('date');
  }

  get hour() {
    return this.form.get('hour');
  }

  get address() {
    return this.form.get('address');
  }

  get formattedAddress() {
    return this.form.get('address.formattedAddress');
  }

  get latitude() {
    return this.form.get('address.latitude');
  }

  get longitude() {
    return this.form.get('address.longitude');
  }

  get notes() {
    return this.form.get('address.notes');
  }

  get capacity() {
    return this.form.get('capacity');
  }

  get invited() {
    return this.form.get('invited');
  }

  get accessibility() {
    return this.form.get('accessibility');
  }

  get media() {
    return this.form.get('media');
  }

  get reviewable() {
    return this.form.get('reviewable');
  }

  get audience() {
    return this.form.get('audience');
  }

  public onSubmit() {
    if (this.form.valid) {
      this.submitMeetingDetailsPage.emit(this.form.value);
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }
}
