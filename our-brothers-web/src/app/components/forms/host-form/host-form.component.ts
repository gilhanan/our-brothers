import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AudienceOptions } from 'src/app/model/host';
import { MeetingAudience } from 'src/app/model';
import { HostInputOption } from '../host-input-options/host-input-options.component';

export interface HostDetailsForm {
  title: string;
  date: number;
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
  audience: MeetingAudience[];
}

@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.scss']
})
export class HostFormComponent implements OnInit {
  @Output() public submitMeetingDetailsPage = new EventEmitter<HostDetailsForm>();

  public form: FormGroup;
  public audienceOptions: HostInputOption[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.audienceOptions = [
      {
        text: 'כולם',
        value: AudienceOptions.all
      },
      {
        text: 'תלמידים',
        value: AudienceOptions.schoolStudents
      },
      {
        text: 'תנועות נוער',
        value: AudienceOptions.youthMovement
      },
      {
        text: 'חיילים',
        value: AudienceOptions.soldiers
      },
      {
        text: 'מכינות',
        value: AudienceOptions.militaryPreparation
      },
      {
        text: 'סטודנטים',
        value: AudienceOptions.students
      }
    ];

    this.form = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      hour: [null, Validators.required],
      address: this.fb.group({
        formattedAddress: ['', Validators.required],
        latitude: [],
        longitude: [],
        notes: ['']
      }),
      capacity: [30, [Validators.required, Validators.min(2)]],
      invited: [null, Validators.required],
      accessibility: [null, Validators.required],
      media: [null, Validators.required],
      reviewable: [null, Validators.required],
      audience: [null, Validators.required]
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
      const newMeetingDetailsPage: HostDetailsForm = this.form.value;

      newMeetingDetailsPage.date = new Date(this.date.value).getTime();
      let hour: string;
      let minutes: string;
      [hour, minutes] = this.hour.value.split(':');
      newMeetingDetailsPage.date += +hour * 60 * 60 * 1000;
      newMeetingDetailsPage.date +=
        (+minutes + new Date().getTimezoneOffset()) * 60 * 1000;

      delete (newMeetingDetailsPage as any).hour;
      this.submitMeetingDetailsPage.emit(newMeetingDetailsPage);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
