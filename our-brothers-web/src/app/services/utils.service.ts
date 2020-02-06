import { Injectable } from '@angular/core';
import { Meeting, User } from '../model';
import { MEMORIAL_YEAR } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  filteringMeetings(meetings: Meeting[], query: string): Meeting[] {
    if (!query || !query.trim()) {
      return meetings.slice();
    } else {
      const keywords = query.match(/([^\s]+)/g) || [];
      return meetings.filter(meeting =>
        keywords.every(
          keyword =>
            meeting.title.includes(keyword) ||
            meeting.address.formattedAddress.includes(keyword) ||
            (
              meeting.bereaved && ((meeting.bereaved.firstName || '') + (meeting.bereaved.lastName || '')).includes(keyword)
            )
        )
      );
    }
  }

  filteringBereaveds(bereaveds: User[], query: string, year = MEMORIAL_YEAR): User[] {
    if (!query || !query.trim()) {
      return bereaveds.slice();
    } else {
      query = query.replace(/-/g, '');
      const keywords = query.match(/([^\s]+)/g) || [];
      return bereaveds.filter(bereaved =>
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
              bereaved.bereavedParticipation[year] &&
              bereaved.bereavedParticipation[year].meetings &&
              bereaved.bereavedParticipation[year].meetings.some(meeting => meeting.title.includes(keyword)))
          )
        ));
    }
  }
}
