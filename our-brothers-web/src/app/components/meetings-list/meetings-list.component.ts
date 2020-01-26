import { Component, Input } from '@angular/core';
import { User, Meeting } from 'src/app/model';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent {

  @Input() meetings: Meeting[];
  @Input() user: User;

  constructor() { }

}
