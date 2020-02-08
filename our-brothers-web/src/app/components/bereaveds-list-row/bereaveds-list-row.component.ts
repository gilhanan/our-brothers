import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, BereavedStatus } from 'src/app/model';
import { MEMORIAL_YEAR, BereavedMeeting, VolunteeringUser } from 'src/app/services/data.service';

@Component({
  selector: 'app-bereaveds-list-row',
  templateUrl: './bereaveds-list-row.component.html',
  styleUrls: ['./bereaveds-list-row.component.scss']
})
export class BereavedsListRowComponent {

  @Input() user: User;
  @Input() bereaved: User;
  @Output() joinBereved = new EventEmitter<User>();
  @Output() leaveBereaved = new EventEmitter<BereavedMeeting>();
  @Output() volunteering = new EventEmitter<boolean>();
  @Output() bereavedStatus = new EventEmitter<BereavedStatus>();

  expanded = false;
  year = MEMORIAL_YEAR;

  constructor() { }

}
