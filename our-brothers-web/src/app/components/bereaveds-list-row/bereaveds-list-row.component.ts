import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model';
import { MEMORIAL_YEAR, BereavedMeeting } from 'src/app/services/data.service';

@Component({
  selector: 'app-bereaveds-list-row',
  templateUrl: './bereaveds-list-row.component.html',
  styleUrls: ['./bereaveds-list-row.component.scss']
})
export class BereavedsListRowComponent {

  @Input() bereaved: User;
  @Output() joinBereved = new EventEmitter<User>();
  @Output() leaveBereaved = new EventEmitter<BereavedMeeting>();

  expanded = false;

  year = MEMORIAL_YEAR;

  constructor() { }

}
