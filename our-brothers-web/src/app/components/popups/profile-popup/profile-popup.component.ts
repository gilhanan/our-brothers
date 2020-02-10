import {
  Component,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { ProfileFormComponent } from '../../forms/profile-form/profile-form.component';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent {
  @ViewChild(ProfileFormComponent, { static: false })
  profileFormComponent: ProfileFormComponent;

  @Output() profileUpdated = new EventEmitter<void>();

  updateProfileData() {
    this.profileFormComponent.saveProfile().subscribe(res => {
      if (res) {
        this.profileUpdated.emit();
      }
    });
  }
}
