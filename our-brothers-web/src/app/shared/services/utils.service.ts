import { Injectable } from '@angular/core';
import { Meeting, MeetingAudience, User } from 'models';
import { MEMORIAL_YEAR, MAX_DATE, MIN_DATE } from '../constants';
import { FormControl } from '@angular/forms';

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

  private readonly ISRAEL_PHONE_PREFIX_REGEX = new RegExp(`^(\\+${this.ISRAEL_PHONE_PREFIX})?(0)?`);

  toInternationalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(this.ISRAEL_PHONE_PREFIX_REGEX, `+${this.ISRAEL_PHONE_PREFIX}`);
  }

  toLocalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(this.ISRAEL_PHONE_PREFIX_REGEX, '0');
  }

  validateMeetingDate(control: FormControl) {
    if (control.value) {
      const date = Number.parseInt(control.value.split('-')[2]);
      if (date <= MAX_DATE.getDate() && date >= MIN_DATE.getDate()) {
        return null;
      }
    }

    return {
      dateInvalid: true
    };
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
            ((meeting.bereaved.firstName || '') + (meeting.bereaved.lastName || '')).includes(keyword))
      )
    );
  }

  filteringBereaveds(bereaveds: User[], query: string, year = MEMORIAL_YEAR): User[] {
    if (!bereaveds) {
      return [];
    }

    if (!query || !query.trim()) {
      return bereaveds;
    }

    query = query.replace(/-/g, '');
    const keywords = query.match(/([^\s]+)/g) || [];
    return bereaveds.filter(bereaved => {
      return keywords.every(keyword => {
        if (bereaved.id.includes(keyword)) {
          return true;
        } else if (bereaved.profile) {
          const { firstName = '', lastName = '', address, email, phoneNumber } = bereaved.profile;
          const fullName = firstName + lastName;
          if (fullName.includes(keyword)) {
            return true;
          } else if (email?.includes(keyword)) {
            return true;
          } else if (address?.formattedAddress?.includes(keyword)) {
            return true;
          }
          const parsedNumber = phoneNumber?.replace(`^\+${this.ISRAEL_PHONE_PREFIX}`, '0');
          if (parsedNumber?.includes(keyword)) {
            return true;
          }
          const slain = bereaved.bereavedProfile?.slains?.some(slain =>
            ((slain.firstName || '') + (slain.lastName || '')).includes(keyword)
          );
          if (slain) {
            return true;
          } else if (bereaved.bereavedParticipation?.[year]?.meetings?.some(({ title }) => title.includes(keyword))) {
            return true;
          }
        }
        return false;
      });
    });
  }

  // TODO: Reuse with filteringBereaveds
  filteringUsers(users: User[], query: string, year = MEMORIAL_YEAR): User[] {
    if (!users) {
      return [];
    }

    if (!query || !query.trim()) {
      return users;
    }

    query = query.replace(/-/g, '');
    const keywords = query.match(/([^\s]+)/g) || [];
    return users.filter(bereaved => {
      return keywords.every(keyword => {
        if (bereaved.id.includes(keyword)) {
          return true;
        } else if (bereaved.profile) {
          const { firstName = '', lastName = '', email, phoneNumber } = bereaved.profile;
          const fullName = firstName + lastName;
          if (fullName.includes(keyword)) {
            return true;
          } else if (email?.includes(keyword)) {
            return true;
          }
          const parsedNumber = phoneNumber?.replace(`^\+${this.ISRAEL_PHONE_PREFIX}`, '0');
          if (parsedNumber?.includes(keyword)) {
            return true;
          }
        }
        return false;
      });
    });
  }
}
