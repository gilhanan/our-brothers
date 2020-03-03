import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'models';
import { MEMORIAL_YEAR, UserMeeting, VolunteeringUser, UpdateBereavedStatus, UpdateBereavedGuidance } from '../../../shared/services/data.service';
import {SortedColumn} from "../../../shared/components/list/list-header/list-header.types";


@Component({
  selector: 'app-bereaveds-list',
  templateUrl: './bereaveds-list.component.html',
  styleUrls: ['./bereaveds-list.component.scss']
})
export class BereavedsListComponent implements OnChanges {

  @Input() user: User;
  @Input() bereaveds: User[];
  @Output() joinBereved = new EventEmitter<void>();
  @Output() leaveBereaved = new EventEmitter<UserMeeting>();
  @Output() volunteering = new EventEmitter<VolunteeringUser>();
  @Output() bereavedStatus = new EventEmitter<UpdateBereavedStatus>();
  @Output() bereavedGuidance = new EventEmitter<UpdateBereavedGuidance>();

  sortedBereaveds: User[] = [];
  year = MEMORIAL_YEAR;

  sortedColumn: SortedColumn = {
    column: 'name',
    direction: 'asc'
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bereaveds) {
      this.bereaveds = this.bereaveds || [];
      this.sort();
    }
  }

  trackByFn(index: number, item: User) {
    return item.id;
  }

  sort() {
    this.sortedBereaveds = this.bereaveds.slice();

    if (this.sortedColumn.column) {
      const column = this.sortedColumn.column;

      this.sortedBereaveds.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (column === 'name') {
          aValue = (a.profile && (a.profile.firstName + a.profile.lastName)) || '';
          bValue = (b.profile && (b.profile.firstName + b.profile.lastName)) || '';
        } else if (column === 'seniority') {
          aValue = a.bereavedProfile && a.bereavedProfile.slains && a.bereavedProfile.slains[0] && a.bereavedProfile.slains[0].deathDate || Number.MAX_VALUE;
          bValue = b.bereavedProfile && b.bereavedProfile.slains && b.bereavedProfile.slains[0] && b.bereavedProfile.slains[0].deathDate || Number.MAX_VALUE;
        } else if (column === 'guidance') {
          aValue = a.bereavedParticipation && a.bereavedParticipation[this.year] && a.bereavedParticipation[this.year].guidance && a.bereavedParticipation[this.year].guidance.general || '';
          bValue = b.bereavedParticipation && b.bereavedParticipation[this.year] && b.bereavedParticipation[this.year].guidance && b.bereavedParticipation[this.year].guidance.general || '';
        } else if (column === 'status') {
          aValue = a.bereavedParticipation && a.bereavedParticipation[this.year] && a.bereavedParticipation[this.year].status || '';
          bValue = b.bereavedParticipation && b.bereavedParticipation[this.year] && b.bereavedParticipation[this.year].status || '';
        } else if (column === 'meetings') {
          aValue = a.bereavedParticipation && a.bereavedParticipation[this.year] && a.bereavedParticipation[this.year].meetings && a.bereavedParticipation[this.year].meetings.length || 0;
          bValue = b.bereavedParticipation && b.bereavedParticipation[this.year] && b.bereavedParticipation[this.year].meetings && b.bereavedParticipation[this.year].meetings.length || 0;
        } else {
          aValue = a[column] || '';
          bValue = b[column] || '';
        }

        if (this.sortedColumn.direction === 'desc') {
          [aValue, bValue] = [bValue, aValue];
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }

        return aValue.toString().localeCompare(bValue);
      });
    }
  }
}
