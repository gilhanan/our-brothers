import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AudienceOptions } from 'src/app/model/host';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  accessibility: boolean;
  media: boolean;
  reviewable: boolean;
  audience: AudienceOptions[];
}

@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.scss']
})
export class HostFormComponent implements OnInit {
  @Output() public submitMeetingDetails = new EventEmitter<HostDetailsForm>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      address: this.fb.group({
        formattedAddress: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
        notes: ['', Validators.required]
      }),
      capacity: [20, Validators.required],
      accessibility: [false],
      media: [false],
      reviewable: [false],
      audience: [AudienceOptions.all]
    });
  }

  get title() {
    return this.form.get('title');
  }

  get date() {
    return this.form.get('date');
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
      const newMeetingDetails: HostDetailsForm = this.form.value;

      newMeetingDetails.date = (this.date.value as Date).getTime();

      this.submitMeetingDetails.emit(newMeetingDetails);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
