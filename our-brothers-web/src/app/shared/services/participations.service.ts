import { Injectable } from '@angular/core';

import { User, Meeting, UserRole, ParticipateParticipationMeeting, UserParticipation, BaseParticipation } from 'models';
import { MEMORIAL_YEAR } from '../constants';

const isUserPresentInMeeting = (meeting: Meeting) => ({ id, hostId }: ParticipateParticipationMeeting) =>
  id === meeting.id && hostId === meeting.hostId;
const isUserBereaved = (user: User) => user.role === UserRole.bereaved;

@Injectable({
  providedIn: 'root'
})
export class ParticipationsService {
  isUserCanHost(user: User): boolean {
    return !user?.role || !isUserBereaved(user) || user?.isAdmin;
  }

  isUserCanParticipate(user: User): boolean {
    return !user?.role || !isUserBereaved(user) || user?.isAdmin;
  }

  isUserCanTell(user: User): boolean {
    return !user?.role || isUserBereaved(user) || user?.isAdmin;
  }

  isParticipating(participates: UserParticipation<BaseParticipation>[], year: number): boolean {
    return participates.some(p => !!p?.[year]?.meetings?.length);
  }

  isUserParticipating(user: User, year: number): boolean {
    return this.isParticipating(
      [user?.participateParticipation, user?.bereavedParticipation, user?.hostParticipation],
      year
    );
  }

  isParticipateParticipatingMeeting(user: User, meeting: Meeting, year = MEMORIAL_YEAR): boolean {
    return user?.participateParticipation?.[year]?.meetings?.some(isUserPresentInMeeting(meeting));
  }

  isBereavedParticipatingMeeting(user: User, meeting: Meeting, year = MEMORIAL_YEAR): boolean {
    return user?.bereavedParticipation?.[year]?.meetings?.some(isUserPresentInMeeting(meeting));
  }

  isHostParticipatingMeeting(user: User, meeting: Meeting): boolean {
    return user?.id === meeting.hostId;
  }

  isUserParticipatingMeeting(user: User, meeting: Meeting, year = MEMORIAL_YEAR): boolean {
    if (!user || !meeting) {
      return false;
    }

    return (
      this.isParticipateParticipatingMeeting(user, meeting, year) ||
      this.isBereavedParticipatingMeeting(user, meeting, year) ||
      this.isHostParticipatingMeeting(user, meeting)
    );
  }

  isUserCanParticipatingMeeting(user: User, meeting: Meeting): boolean {
    if (!user || !meeting) {
      return false;
    }

    if (this.isUserParticipatingMeeting(user, meeting)) {
      return false;
    }

    if (user.role === UserRole.bereaved) {
      return this.isBereavedCanParticipatingMeeting(user, meeting);
    } else {
      return this.isParticipateCanParticipatingMeeting(user, meeting);
    }
  }

  isBereavedCanParticipatingMeeting(user: User, meeting: Meeting, year = MEMORIAL_YEAR): boolean {
    if (!user || !meeting || user.role !== UserRole.bereaved) {
      return false;
    }

    if (this.isBereavedParticipatingMeeting(user, meeting, year)) {
      return false;
    }

    return (
      !meeting.bereaved &&
      this.isBereavedHaveAllDetails(user) &&
      this.isBereavedHaveSlainDetails(user) &&
      this.isBereavedAnsweredTrainingMeeting(user)
    );
  }

  isParticipateCanParticipatingMeeting(user: User, meeting: Meeting, year = MEMORIAL_YEAR): boolean {
    if (!user || !meeting || user.role === UserRole.bereaved) {
      return false;
    }

    if (this.isParticipateParticipatingMeeting(user, meeting, year)) {
      return false;
    }

    return !meeting.invited && meeting.count <= meeting.capacity && this.isParticipateHaveAllDetails(user);
  }

  isUserHaveAllDetails(user: User): boolean {
    if (!user) {
      return false;
    }

    if (user.role === UserRole.bereaved) {
      return this.isBereavedHaveAllDetails(user);
    } else {
      return this.isParticipateHaveAllDetails(user);
    }
  }

  isParticipateHaveAllDetails(user: User): boolean {
    if (user?.profile) {
      const { email, firstName, lastName, phoneNumber } = user.profile;
      return !!(email && firstName && lastName && phoneNumber);
    }

    return false;
  }

  isBereavedHaveAllDetails(user: User): boolean {
    if (!user) {
      return false;
    }

    return (
      this.isBereavedHaveProfileDetails(user) &&
      this.isBereavedHaveSlainDetails(user) &&
      this.isBereavedAnsweredTrainingMeeting(user)
    );
  }

  isBereavedHaveProfileDetails(user: User) {
    if (user?.profile) {
      const { birthDay, address } = user.profile;
      return birthDay && address && this.isParticipateHaveAllDetails(user);
    }

    return false;
  }

  isBereavedHaveSlainDetails(user: User): boolean {
    return !!user?.bereavedProfile;
  }

  isBereavedAnsweredTrainingMeeting(user: User, year = MEMORIAL_YEAR): boolean {
    return user?.bereavedParticipation?.[year]?.guidance?.answered;
  }
}
