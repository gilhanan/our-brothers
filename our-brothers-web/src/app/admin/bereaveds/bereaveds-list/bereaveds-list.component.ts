import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BereavedGuidance, User } from 'models';
import { MEMORIAL_YEAR } from '../../../shared/constants';
import { UpdateBereavedStatus, UserMeeting, VolunteeringUser } from '../../../shared/services/data.service';
import { SortedColumn } from '../../../shared/components/list/list-header/list-header.types';

@Component({
  selector: 'app-bereaveds-list',
  templateUrl: './bereaveds-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./bereaveds-list.component.scss']
})
export class BereavedsListComponent {
  @Input() user: User;
  @Input() bereaveds: User[];
  @Input() filteredBereaveds: Set<string>;
  @Output() joinBereved = new EventEmitter<User>();
  @Output() leaveBereaved = new EventEmitter<UserMeeting>();
  @Output() volunteering = new EventEmitter<VolunteeringUser>();
  @Output() bereavedStatus = new EventEmitter<UpdateBereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<{ bereaved: User; guidance: BereavedGuidance }>();

  year = MEMORIAL_YEAR;
  sortedColumn: SortedColumn = {
    column: 'name',
    direction: 'asc'
  };
}
