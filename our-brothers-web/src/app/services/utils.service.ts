import { Injectable } from '@angular/core';
import { Meeting, MeetingAudience, User } from 'models';
import { MEMORIAL_YEAR } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public phonePattern = /^05(\d-?){8}$/;
  public namePattern = /^([A-Za-zא-ת\- '"])+$/;
  public subjectPattern = /^([A-Za-zא-ת\- \?\!\(\)\[\]\#'"])+$/;

  public meetingAudienceLabels: { [audience in MeetingAudience]: string } = {
    all: 'כולם',
    schoolStudents: 'תלמידים',
    youthMovement: 'תנועות נוער',
    militaryPreparation: 'מכינות',
    soldiers: 'חיילים',
    students: 'סטודנטים'
  };

  private readonly ISRAEL_PHONE_PREFIX = '972';

  private readonly ISRAEL_PHONE_PREFIX_REGEX = new RegExp(
    `^(\\+${this.ISRAEL_PHONE_PREFIX})?(0)?`
  );

  constructor() {}

  toInternationalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(
      this.ISRAEL_PHONE_PREFIX_REGEX,
      `+${this.ISRAEL_PHONE_PREFIX}`
    );
  }

  toLocalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(this.ISRAEL_PHONE_PREFIX_REGEX, '0');
  }

  filteringMeetings(meetings: Meeting[], query: string): Meeting[] {
    if (!meetings) {
      return [];
    }

    if (!query || !query.trim()) {
      return meetings.slice();
    }

    const keywords = query.match(/([^\s]+)/g) || [];
    return meetings.filter(meeting =>
      keywords.every(
        keyword =>
          meeting.title.includes(keyword) ||
          meeting.address.formattedAddress.includes(keyword) ||
          (meeting.bereaved &&
            (
              (meeting.bereaved.firstName || '') +
              (meeting.bereaved.lastName || '')
            ).includes(keyword))
      )
    );
  }

  filteringBereaveds(
    bereaveds: User[],
    query: string,
    year = MEMORIAL_YEAR
  ): User[] {
    if (!bereaveds) {
      return [];
    }

    if (!query || !query.trim()) {
      return bereaveds.slice();
    }

    query = query.replace(/-/g, '');
    const keywords = query.match(/([^\s]+)/g) || [];
    return bereaveds.filter(bereaved =>
      keywords.every(
        keyword =>
          bereaved.id.includes(keyword) ||
          (bereaved.profile &&
            ((
              (bereaved.profile.firstName || '') +
              (bereaved.profile.lastName || '')
            ).includes(keyword) ||
              (bereaved.profile.email &&
                bereaved.profile.email.includes(keyword)) ||
              (bereaved.profile.phoneNumber &&
                bereaved.profile.phoneNumber
                  .replace(`^\+${this.ISRAEL_PHONE_PREFIX}`, '0')
                  .includes(keyword)))) ||
          (bereaved.bereavedProfile &&
            bereaved.bereavedProfile.slains &&
            bereaved.bereavedProfile.slains.some(slain =>
              ((slain.firstName || '') + (slain.lastName || '')).includes(
                keyword
              )
            )) ||
          (bereaved.bereavedParticipation &&
            bereaved.bereavedParticipation[year] &&
            bereaved.bereavedParticipation[year].meetings &&
            bereaved.bereavedParticipation[year].meetings.some(meeting =>
              meeting.title.includes(keyword)
            ))
      )
    );
  }
}
