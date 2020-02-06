import { Component, OnInit } from '@angular/core';
import { User, Meeting } from '../../../app/model';
import { DataService, MEMORIAL_YEAR, BereavedMeeting } from '../../../app/services/data.service';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-admin-bereaveds-page',
  templateUrl: './admin-bereaveds-page.component.html',
  styleUrls: ['./admin-bereaveds-page.component.scss']
})
export class AdminBereavedsPageComponent implements OnInit {

  bereaveds: User[];
  noBerevedMeetings: Meeting[];
  filter: string = '';
  filteredBereaveds: User[];
  year = MEMORIAL_YEAR;

  selectedMeeting$ = new Subject<BereavedMeeting>();
  selectingBereaved: User;

  constructor(
    private dataService: DataService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.dataService.getBereaveds().subscribe(bereaveds => {
      this.bereaveds = bereaveds;
      this.filterBereaveds();
    });
    this.dataService.getNoBerevedMeetings().subscribe(noBerevedMeetings => {
      this.noBerevedMeetings = noBerevedMeetings;
    });
  }

  filterBereaveds() {
    this.filteredBereaveds = this.utilsService.filteringBereaveds(this.bereaveds, this.filter);
  }

  joinBereved(bereaved: User) {
    this.selectingBereaved = bereaved;
    if (this.noBerevedMeetings && this.noBerevedMeetings.length) {
      this.selectedMeeting$.pipe(take(1)).subscribe(({ meeting }: BereavedMeeting) => {
        this.selectingBereaved = null;
        if (meeting) {
          this.dataService.bereavedRegisterHost(bereaved, meeting);
        }
      })
    } else {
      this.selectingBereaved = null;
    }
  }

  leaveBereaved({ meeting, bereaved }: BereavedMeeting) {
    if (meeting && bereaved) {
      if (window.confirm(' האם ברצונך להסיר את' + bereaved.profile.firstName + ' ' + bereaved.profile.lastName + ' מהמפגש ' + meeting.title + '?')) {
        this.dataService.bereavedLeaveHost(bereaved, meeting);
      }
    }
  }
}
