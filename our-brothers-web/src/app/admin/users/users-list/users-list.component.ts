import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'models';
import { SortedColumn } from '../../../shared/components/list/list-header/list-header.types';
import { VolunteeringUser } from '../../../shared/services/data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() currentUser: User;
  @Input() users: User[];
  @Input() filteredUsers: Set<string>;

  @Output() volunteering = new EventEmitter<VolunteeringUser>();
  @Output() deleting = new EventEmitter<User>();

  sortedColumn: SortedColumn = {
    column: 'name',
    direction: 'asc'
  };
}
