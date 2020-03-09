import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { User, Meeting } from 'models';
import { UtilsService } from '../../../shared/services/utils.service';
import { DataService, VolunteeringUser } from '../../../shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit, OnDestroy {
  currentUser: User;
  users: User[];
  filter: string = '';
  filteredUsersIds: Set<string>;
  error = '';
  loading = true;

  selectedMeeting$ = new Subject<Meeting>();
  selectingUser: User;

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private dataService: DataService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user.subscribe(currentUser => (this.currentUser = currentUser)),
      this.dataService.getUsers().subscribe(
        users => {
          this.loading = false;
          this.users = users;
          this.filteredUsersIds = new Set(users.map(({ id }) => id));
        },
        error => {
          this.loading = false;
          this.error = error.toString();
        }
      )
    );
  }

  filterUsers() {
    const filteredUsersIds = this.utilsService.filteringUsers(this.users, this.filter).map(({ id }) => id);
    this.filteredUsersIds = new Set(filteredUsersIds);
  }

  volunteering({ user, isVolunteer }: VolunteeringUser) {
    if (user) {
      if (
        window.confirm(
          'האם ברוצנך ' +
            (isVolunteer ? 'להגדיר' : 'להסיר') +
            ' את ' +
            user.profile.firstName +
            ' ' +
            user.profile.lastName +
            ' כמתנדב/ת?'
        )
      ) {
        this.dataService.setUserVolunteer(user, isVolunteer);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
