import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { User, Meeting } from 'models';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-admin-statistics-page',
  templateUrl: './admin-statistics-page.component.html',
  styleUrls: ['./admin-statistics-page.component.scss']
})
export class AdminStatisticsPageComponent implements OnInit {
  loadingUsers = true;
  loadingBereaveds = true;
  loadingMeetings = true;
  users: User[];
  bereaveds: User[];
  meetings: Meeting[];
  error: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getUsers()
      .pipe(take(1))
      .subscribe(
        users => {
          this.loadingUsers = false;
          this.users = users;
        },
        error => {
          this.loadingUsers = false;
          this.error = error.toString();
        }
      );
    this.dataService
      .getBereaveds()
      .pipe(take(1))
      .subscribe(
        bereaveds => {
          this.loadingBereaveds = false;
          this.bereaveds = bereaveds;
        },
        error => {
          this.loadingBereaveds = false;
          this.error = error.toString();
        }
      );
    this.dataService
      .getAllMeetings()
      .pipe(take(1))
      .subscribe(
        meetings => {
          this.loadingMeetings = false;
          this.meetings = meetings;
        },
        error => {
          this.loadingMeetings = false;
          this.error = error.toString();
        }
      );
  }
}
