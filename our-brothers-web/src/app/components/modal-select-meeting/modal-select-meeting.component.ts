import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Meeting, User } from 'src/app/model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modal-select-meeting',
  templateUrl: './modal-select-meeting.component.html',
  styleUrls: ['./modal-select-meeting.component.scss']
})
export class ModalSelectMeetingComponent implements OnChanges {

  @Input() bereaved: User;
  @Input() meetings: Meeting[];
  @Output() selectMeeting = new EventEmitter<Meeting>();

  filter: string = '';
  filteredMeetings: Meeting[];

  constructor(private utilsService: UtilsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterMeetings(this.filter)
  }

  filterMeetings(filter: string) {
    this.filteredMeetings = this.utilsService.filteringMeetings(this.meetings, filter);
  }

}
