import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BereavedGuidance, User } from 'models';
import { MEMORIAL_YEAR } from '../../../shared/constants';
import {
  UpdateBereavedStatus,
  UserMeeting,
  VolunteeringUser,
  UpdateBereavedNotes,
  UpdateUserAddress,
  UpdateBereavedGuidance,
  UpdateUserBirthDate
} from '../../../shared/services/data.service';
import { SortedColumn } from '../../../shared/components/list/list-header/list-header.types';

@Component({
  selector: 'app-bereaveds-list',
  templateUrl: './bereaveds-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./bereaveds-list.component.scss']
})
export class BereavedsListComponent {
  @Input() currentUser: User;
  @Input() bereaveds: User[];
  @Input() filteredBereaveds: Set<string>;
  @Output() joinBereved = new EventEmitter<User>();
  @Output() leaveBereaved = new EventEmitter<UserMeeting>();
  @Output() volunteering = new EventEmitter<VolunteeringUser>();
  @Output() deleting = new EventEmitter<User>();
  @Output() bereavedStatus = new EventEmitter<UpdateBereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<UpdateBereavedGuidance>();
  @Output() bereavedBirthDate = new EventEmitter<UpdateUserBirthDate>();
  @Output() bereavedNotes = new EventEmitter<UpdateBereavedNotes>();
  @Output() bereavedAddress = new EventEmitter<UpdateUserAddress>();

  year = MEMORIAL_YEAR;
  sortedColumn: SortedColumn = {
    column: 'name',
    direction: 'asc'
  };
}
