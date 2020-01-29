import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/model';
import { DataService, MEMORIAL_YEAR } from '../../../app/services/data.service';

@Component({
  selector: 'app-admin-bereaveds-page',
  templateUrl: './admin-bereaveds-page.component.html',
  styleUrls: ['./admin-bereaveds-page.component.scss']
})
export class AdminBereavedsPageComponent implements OnInit {

  bereaveds: User[];
  filteredBereaveds: User[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getBereaveds().subscribe(bereaveds => {
      this.bereaveds = bereaveds;
      this.filterBereaveds('');
    });
  }

  filterBereaveds(query: string) {
    if (!query || !query.trim()) {
      this.filteredBereaveds = this.bereaveds.slice();
    } else {
      const keywords = query.split(/( )+/);
      this.filteredBereaveds = this.bereaveds.filter(bereaved =>
        keywords.every(keyword =>
          (
            bereaved.id.includes(keyword) ||
            (bereaved.profile &&
              (
                bereaved.profile.firstName.includes(keyword) ||
                bereaved.profile.lastName.includes(keyword) ||
                bereaved.profile.email.includes(keyword) ||
                bereaved.profile.phoneNumber.includes(keyword)
              )
            ) ||
            bereaved.bereavedProfile && bereaved.bereavedProfile.slain.some(slain => slain.firstName.includes(keyword) || slain.lastName.includes(keyword)) ||
            bereaved.bereavedParticipation && bereaved.bereavedParticipation[MEMORIAL_YEAR].meetings.some((meeting) => meeting.id.includes(keyword) || meeting.title.includes(keyword))
          )
        ));
    }
  }

}
