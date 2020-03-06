import { Injectable } from '@angular/core';
import { User, Meeting, UserRole, ParticipateParticipationMeeting, UserParticipation, BaseParticipation } from 'models';
import { MEMORIAL_YEAR } from '../constants';

const isUserPresentInMeeting = (meeting: Meeting) => ({ id, hostId }: ParticipateParticipationMeeting) =>
  id === meeting.id && hostId === meeting.hostId;
const isUserBereaved = (user: User) => user?.role === UserRole.bereaved;

@Injectable({
  providedIn: 'root'
})
export class ParticipationsService {
  isUserCanHost(user: User) {
    return !isUserBereaved(user);
  }

  isUserCanParticipate(user: User) {
    return !isUserBereaved(user);
  }

  isUserCanTell(user: User) {
    return isUserBereaved(user);
  }

  isParticipating(participates: UserParticipation<BaseParticipation>[], year: number) {
    return participates.some(p => !!p?.[year]?.meetings?.length);
  }

  isUserParticipating(user: User, year: number) {
    return this.isParticipating(
      [user?.participateParticipation, user?.bereavedParticipation, user?.hostParticipation],
      year
    );
  }

  isParticipateParticipatingEvent(user: User, meeting: Meeting, year = MEMORIAL_YEAR) {
    return user?.participateParticipation?.[year]?.meetings?.some(isUserPresentInMeeting(meeting));
  }

  isBereavedParticipatingEvent(user: User, meeting: Meeting, year = MEMORIAL_YEAR) {
    return user?.bereavedParticipation?.[year]?.meetings?.some(isUserPresentInMeeting(meeting));
  }

  isHostParticipatingEvent(user: User, meeting: Meeting) {
    return user?.id === meeting.hostId;
  }

  isUserParticipatingEvent(user: User, meeting: Meeting, year = MEMORIAL_YEAR) {
    if (!meeting) {
      return false;
    }

    return (
      this.isParticipateParticipatingEvent(user, meeting, year) ||
      this.isBereavedParticipatingEvent(user, meeting, year) ||
      this.isHostParticipatingEvent(user, meeting)
    );
  }

  isUserCanParticipatingEvent(user: User, meeting: Meeting) {
    if (!user) {
      return false;
    }

    if (!meeting) {
      return true;
    }

    if (this.isUserParticipatingEvent(user, meeting)) {
      return false;
    }

    if (user.role === UserRole.bereaved) {
      return this.isBereavedCanParticipatingEvent(user, meeting);
    } else {
      return this.isParticipateCanParticipatingEvent(user, meeting);
    }
  }

  isBereavedCanParticipatingEvent(user: User, meeting: Meeting) {
    return (
      !meeting.bereaved &&
      this.isBereavedHaveAllDetails(user) &&
      this.isBereavedHaveSlainDetails(user) &&
      this.isBereavedAnsweredTrainingMeeting(user)
    );
  }

  isParticipateCanParticipatingEvent(user: User, meeting: Meeting) {
    return !meeting.invited && meeting.count <= meeting.capacity && this.isParticipateHaveAllDetails(user);
  }

  isUserHaveAllDetails(user: User) {
    if (!user) {
      return false;
    }

    if (user.role === UserRole.bereaved) {
      return this.isBereavedHaveAllDetails(user);
    } else {
      return this.isParticipateHaveAllDetails(user);
    }
  }

  isParticipateHaveAllDetails(user: User) {
    if (user?.profile) {
      const { email, firstName, lastName, phoneNumber } = user?.profile;
      return !!(email && firstName && lastName && phoneNumber);
    }

    return false;
  }

  isBereavedHaveAllDetails(user: User) {
    return user.profile.birthDay && this.isParticipateHaveAllDetails(user);
  }

  isBereavedHaveSlainDetails = (user: User) => {
    return user.bereavedProfile;
  };

  isBereavedAnsweredTrainingMeeting(user: User, year = MEMORIAL_YEAR) {
    return user?.bereavedParticipation?.[year]?.guidance?.answered;
  }
}
