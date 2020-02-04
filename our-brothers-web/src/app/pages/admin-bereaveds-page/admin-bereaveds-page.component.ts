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
  year = MEMORIAL_YEAR;

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
      query = query.replace(/-/g, '');
      const keywords = query.match(/([^\s]+)/g) || [];
      this.filteredBereaveds = this.bereaveds.filter(bereaved =>
        keywords.every(keyword =>
          (
            bereaved.id.includes(keyword) ||
            (bereaved.profile &&
              (
                ((bereaved.profile.firstName || '') + (bereaved.profile.lastName || '')).includes(keyword) ||
                bereaved.profile.email && bereaved.profile.email.includes(keyword) ||
                bereaved.profile.phoneNumber && (bereaved.profile.phoneNumber.replace(/^\+972/, '0').includes(keyword))
              )
            ) ||
            bereaved.bereavedProfile && bereaved.bereavedProfile.slains && bereaved.bereavedProfile.slains.some(slain => ((slain.firstName || '') + (slain.lastName || '')).includes(keyword)) ||
            (
              bereaved.bereavedParticipation &&
              bereaved.bereavedParticipation[this.year] &&
              bereaved.bereavedParticipation[this.year].meetings &&
              bereaved.bereavedParticipation[this.year].meetings.some(meeting => meeting.title.includes(keyword)))
          )
        ));
    }
  }

}
