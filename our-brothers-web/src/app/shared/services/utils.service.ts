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

  isMobile() {
    const agent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // tslint:disable-next-line: max-line-length
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        agent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        agent.substr(0, 4)
      )
    );
  }

  toInternationalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(this.ISRAEL_PHONE_PREFIX_REGEX, `+${this.ISRAEL_PHONE_PREFIX}`);
  }

  toLocalPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(this.ISRAEL_PHONE_PREFIX_REGEX, '0');
  }

  validateMeetingDate(control: FormControl) {
    if (control.value) {
      const date = Number.parseInt(control.value.split('-')[2], 10);
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
          }
          if (email?.includes(keyword)) {
            return true;
          }
          if (address?.formattedAddress?.includes(keyword)) {
            return true;
          }
          const parsedNumber = phoneNumber?.replace(`^\+${this.ISRAEL_PHONE_PREFIX}`, '0');
          if (parsedNumber?.includes(keyword)) {
            return true;
          }
          if (bereaved.volunteer?.id.includes(keyword)) {
            return true;
          }
          if (((bereaved.volunteer?.firstName || '') + (bereaved.volunteer?.lastName || '')).includes(keyword)) {
            return true;
          }
          const slain = bereaved.bereavedProfile?.slains?.some(s =>
            ((s.firstName || '') + (s.lastName || '')).includes(keyword)
          );
          if (slain) {
            return true;
          }
          if (bereaved.bereavedParticipation?.[year]?.meetings?.some(({ title }) => title.includes(keyword))) {
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
          }
          if (email?.includes(keyword)) {
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
