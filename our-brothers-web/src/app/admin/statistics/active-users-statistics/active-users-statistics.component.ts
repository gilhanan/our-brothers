import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User, UserRole } from 'models';
import { MEMORIAL_YEAR } from 'src/app/shared/constants';

type ActiveUsers = {
  [role in UserRole]: {
    new: number;
    old: number;
  };
};

@Component({
  selector: 'app-active-users-statistics',
  templateUrl: './active-users-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./active-users-statistics.component.scss']
})
export class ActiveUsersStatisticsComponent {
  activeUsers: ActiveUsers;
  total: number = 0;

  @Input()
  set users(users: User[]) {
    this.activeUsers = this.calcActiveUsers(users);
  }

  calcActiveUsers(users: User[]): ActiveUsers {
    const activeUsers: ActiveUsers = {
      [UserRole.bereaved]: {
        new: 0,
        old: 0
      },
      [UserRole.host]: {
        new: 0,
        old: 0
      },
      [UserRole.participate]: {
        new: 0,
        old: 0
      }
    };

    const current = new Date(MEMORIAL_YEAR, 1, 1).getTime();

    for (const user of users) {
      if (user.lastSignInDate >= current) {
        this.total++;
        if (user.registered >= current) {
          activeUsers[user.role].new++;
        } else {
          activeUsers[user.role].old++;
        }
      }
    }

    return activeUsers;
  }
}
