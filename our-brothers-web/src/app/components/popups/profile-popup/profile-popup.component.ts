import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { ProfileFormComponent } from '../../forms/profile-form/profile-form.component';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit, AfterViewInit {
  @ViewChild(ProfileFormComponent, { static: false })
  profileFormComponent: ProfileFormComponent;

  @Output() profileUpdated = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  updateProfileData() {
    this.profileFormComponent.saveProfile().subscribe(res => {
      if (res) {
        this.profileUpdated.emit();
      }
    });
  }
}
