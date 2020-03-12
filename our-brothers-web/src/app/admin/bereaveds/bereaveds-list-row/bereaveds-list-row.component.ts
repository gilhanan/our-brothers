import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, BereavedStatus, BereavedGuidance, Meeting, Address } from 'models';
import { MEMORIAL_YEAR } from '../../../shared/constants';
import { ParticipationsService } from '../../../shared/services/participations.service';

@Component({
  selector: 'app-bereaveds-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bereaveds-list-row.component.html',
  styleUrls: ['./bereaveds-list-row.component.scss']
})
export class BereavedsListRowComponent {
  @Input() currentUser: User;
  @Input() bereaved: User;
  @Output() joinBereved = new EventEmitter<void>();
  @Output() leaveBereaved = new EventEmitter<Meeting>();
  @Output() deleting = new EventEmitter<void>();
  @Output() volunteering = new EventEmitter<boolean>();
  @Output() bereavedStatus = new EventEmitter<BereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<BereavedGuidance>();
  @Output() bereavedBirthDate = new EventEmitter<number>();
  @Output() bereavedNotes = new EventEmitter<string>();
  @Output() bereavedAddress = new EventEmitter<Address>();

  expanded = false;
  year = MEMORIAL_YEAR;

  constructor(public participationsService: ParticipationsService) {}
}
