import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, BereavedStatus, BereavedGuidance, Meeting } from 'models';
import { MEMORIAL_YEAR } from '../../../shared/services/data.service';
import { ParticipationsService } from '../../../shared/services/participations.service';

@Component({
  selector: 'app-bereaveds-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bereaveds-list-row.component.html',
  styleUrls: ['./bereaveds-list-row.component.scss']
})
export class BereavedsListRowComponent {

  @Input() user: User;
  @Input() bereaved: User;
  @Output() joinBereved = new EventEmitter<void>();
  @Output() leaveBereaved = new EventEmitter<Meeting>();
  @Output() volunteering = new EventEmitter<boolean>();
  @Output() bereavedStatus = new EventEmitter<BereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<BereavedGuidance>();

  expanded = false;
  year = MEMORIAL_YEAR;

  constructor(public participationsService: ParticipationsService) { }

}
