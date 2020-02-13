import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Meeting } from 'src/app/model';
import { User } from 'firebase';
import { UtilsService } from 'src/app/services/utils.service';
import { ViewOptions } from '../view-toggle/view-toggle.component';
import { UserMeeting } from 'src/app/services/data.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnChanges {
  @Input() meetings: Meeting[];
  @Input() user: User;
  @Input() mapShowGuide = true;

  @Output() joinMeeting = new EventEmitter<UserMeeting>();
  @Output() guideCompleted = new EventEmitter<void>();

  filteredMeetings: Meeting[];
  view: ViewOptions = 'list';
  filter: string = '';

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meetings) {
      this.filterMeetings();
    }
  }

  filterMeetings() {
    this.filteredMeetings = this.utilsService.filteringMeetings(this.meetings, this.filter);
  }
}
