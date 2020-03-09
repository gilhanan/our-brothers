import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { User } from 'models';

@Component({
  selector: 'app-users-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list-row.component.html',
  styleUrls: ['./users-list-row.component.scss']
})
export class UsersListRowComponent {
  @Input() currentUser: User;
  @Input() user: User;

  @Output() volunteering = new EventEmitter<boolean>();

  expanded = false;
}
