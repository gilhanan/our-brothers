import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User, Meeting } from 'models';
import { MEMORIAL_YEAR } from '../../../shared/constants';
import { AuthService } from '../../../shared/services/auth.service';
import {
  DataService,
  UserMeeting,
  VolunteeringUser,
  UpdateBereavedStatus,
  UpdateBereavedGuidance,
  UpdateBereavedNotes
} from '../../../shared/services/data.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-admin-bereaveds-page',
  templateUrl: './admin-bereaveds-page.component.html',
  styleUrls: ['./admin-bereaveds-page.component.scss']
})
export class AdminBereavedsPageComponent implements OnInit, OnDestroy {
  currentUser: User;
  bereaveds: User[];
  noBerevedMeetings: Meeting[];
  filter: string = '';
  filteredBereavedsIds: Set<string>;
  year = MEMORIAL_YEAR;
  error = '';
  loading = true;

  selectedMeeting$ = new Subject<Meeting>();
  selectingBereaved: User;

  private subscriptions: Subscription[] = [];

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService,
    private httpService: HttpService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user.subscribe(currentUser => {
        this.currentUser = currentUser;
      }),
      this.dataService.getBereaveds().subscribe(
        bereaveds => {
          this.loading = false;
          this.bereaveds = bereaveds;
          this.filterBereaveds();
        },
        error => {
          this.loading = false;
          this.error = error.toString();
        }
      ),
      this.dataService.getNoBerevedMeetings().subscribe(noBerevedMeetings => {
        this.noBerevedMeetings = noBerevedMeetings;
      })
    );
  }

  filterBereaveds() {
    const filteredBereavedsIds = this.utilsService.filteringBereaveds(this.bereaveds, this.filter).map(({ id }) => id);
    this.filteredBereavedsIds = new Set(filteredBereavedsIds);
  }

  joinBereved(bereaved: User) {
    this.selectingBereaved = bereaved;
    if (this.noBerevedMeetings && this.noBerevedMeetings.length) {
      this.selectedMeeting$.pipe(take(1)).subscribe(meeting => {
        this.selectingBereaved = null;
        if (meeting) {
          this.dataService.bereavedRegisterHost(bereaved, meeting).subscribe(
            () => {
              this.toastr.success('האח/ות שובץ בהצלחה');
            },
            () => {
              this.toastr.error('שגיאה - לא ניתן לשבץ למפגש. נא ליצור קשר.');
            }
          );
        }
      });
    } else {
      this.selectingBereaved = null;
    }
  }

  leaveBereaved({ user, meeting }: UserMeeting) {
    if (user && meeting) {
      if (
        window.confirm(
          'האם ברצונך להסיר את ' +
            user.profile.firstName +
            ' ' +
            user.profile.lastName +
            ' מהמפגש ' +
            meeting.title +
            '?'
        )
      ) {
        this.dataService.bereavedLeaveHost(user, meeting).subscribe(
          () => {
            this.toastr.success('המשתמש הוסר בהצלחה.');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן להסיר משתמש. נא ליצור קשר.');
          }
        );
      }
    }
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
        this.dataService.setUserVolunteer(user, isVolunteer).subscribe(
          () => {
            this.toastr.success('המשתמש הוגדר כמתנדב בהצלחה.');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן להגדיר משתמש כמתנדב. נא ליצור קשר.');
          }
        );
      }
    }
  }

  deleting(user: User) {
    if (user) {
      if (window.confirm('האם ברצונך למחוק את ' + user.profile.firstName + ' ' + user.profile.lastName + '?')) {
        this.httpService.deleteUser(user).subscribe(
          () => {
            this.toastr.success('המשתמש נמחק בהצלחה.');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן למחוק משתמש. נא ליצור קשר.');
          }
        );
      }
    }
  }

  bereavedStatus({ bereaved, status }: UpdateBereavedStatus) {
    if (bereaved) {
      this.dataService.setBereavedStatus(bereaved, status);
    }
  }

  bereavedGuidance({ bereaved, guidance }: UpdateBereavedGuidance) {
    if (bereaved) {
      this.dataService.setBereavedGuidanceGeneral(bereaved, guidance);
    }
  }

  bereavedNotes({ bereaved, notes }: UpdateBereavedNotes) {
    if (bereaved) {
      this.dataService.setBereavedNotes(bereaved, notes);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
