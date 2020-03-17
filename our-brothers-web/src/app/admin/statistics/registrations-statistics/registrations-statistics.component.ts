import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User, UserRole } from 'models';

type RegisteredUsers = {
  [role in UserRole]: number;
};

interface YearlyRegisteredUsers {
  year: number;
  registeredUsers: RegisteredUsers;
}

@Component({
  selector: 'app-registrations-statistics',
  templateUrl: './registrations-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./registrations-statistics.component.scss']
})
export class RegistrationsStatisticsComponent {
  yearlyRegisteredUsers: YearlyRegisteredUsers[];
  total: number = 0;

  @Input()
  set users(users: User[]) {
    this.yearlyRegisteredUsers = this.calcYearlyRegisteredUsers(users);
  }

  calcYearlyRegisteredUsers(users: User[]): YearlyRegisteredUsers[] {
    const yearlyRegisteredUsersMap: {
      [year: number]: RegisteredUsers;
    } = {};

    for (const user of users) {
      const year = new Date(user.registered).getFullYear();

      if (!Number.isNaN(year)) {
        this.total++;

        yearlyRegisteredUsersMap[year] = yearlyRegisteredUsersMap[year] || {
          [UserRole.bereaved]: 0,
          [UserRole.host]: 0,
          [UserRole.participate]: 0
        };

        yearlyRegisteredUsersMap[year][user.role]++;
      }
    }

    return Object.keys(yearlyRegisteredUsersMap)
      .map(year => ({
        year: Number.parseInt(year),
        registeredUsers: yearlyRegisteredUsersMap[year]
      }))
      .sort((a, b) => b.year - a.year);
  }
}
