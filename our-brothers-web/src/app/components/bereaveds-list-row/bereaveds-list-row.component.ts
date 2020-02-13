import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, BereavedStatus, BereavedGuidance } from 'src/app/model';
import { MEMORIAL_YEAR, UserMeeting } from 'src/app/services/data.service';

@Component({
  selector: 'app-bereaveds-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bereaveds-list-row.component.html',
  styleUrls: ['./bereaveds-list-row.component.scss']
})
export class BereavedsListRowComponent {

  @Input() user: User;
  @Input() bereaved: User;
  @Output() joinBereved = new EventEmitter<User>();
  @Output() leaveBereaved = new EventEmitter<UserMeeting>();
  @Output() volunteering = new EventEmitter<boolean>();
  @Output() bereavedStatus = new EventEmitter<BereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<BereavedGuidance>();

  expanded = false;
  year = MEMORIAL_YEAR;

  constructor() { }

}
