import { Injectable } from '@angular/core';
import { User, Meeting, UserRole } from 'models';
import { MEMORIAL_YEAR } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationsService {
  constructor() { }

  isUserCanHost = (user: User) => {
    return !(user && user.role && user.role === UserRole.bereaved);
  }

  isUserCanParticipate = (user: User) => {
    return !(user && user.role && user.role === UserRole.bereaved);
  }

  isUserCanTell = (user: User) => {
    return !(user && user.role && user.role !== UserRole.bereaved);
  }

  isParticipateParticipating = (user: User, year: number) => {
    return (
      !!user &&
      !!user.participateParticipation &&
      !!user.participateParticipation[year] &&
      !!user.participateParticipation[year].meetings &&
      !!user.participateParticipation[year].meetings.length
    );
  };

  isBereavedParticipating = (user: User, year: number) => {
    return (
      !!user &&
      !!user.bereavedParticipation &&
      !!user.bereavedParticipation[year] &&
      !!user.bereavedParticipation[year].meetings &&
      !!user.bereavedParticipation[year].meetings.length
    );
  };

  isHostParticipating = (user: User, year: number) => {
    return (
      !!user &&
      !!user.hostParticipation &&
      !!user.hostParticipation[year] &&
      !!user.hostParticipation[year].meetings &&
      !!user.hostParticipation[year].meetings.length
    );
  };

  isUserParticipating = (user: User, year: number) => {
    return (
      this.isParticipateParticipating(user, year) ||
      this.isBereavedParticipating(user, year) ||
      this.isHostParticipating(user, year)
    );
  };

  isParticipateParticipatingEvent = (
    user: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ) => {
    return (
      !!user &&
      !!user.participateParticipation &&
      !!user.participateParticipation[year] &&
      !!user.participateParticipation[year].meetings &&
      user.participateParticipation[year].meetings.some(
        e => e.id === meeting.id && e.hostId === meeting.hostId
      )
    );
  };

  isBereavedParticipatingEvent = (
    user: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ) => {
    return (
      !!user &&
      !!user.bereavedParticipation &&
      !!user.bereavedParticipation[year] &&
      !!user.bereavedParticipation[year].meetings &&
      user.bereavedParticipation[year].meetings.some(
        e => e.id === meeting.id && e.hostId === meeting.hostId
      )
    );
  };

  isHostParticipatingEvent = (
    user: User,
    meeting: Meeting
  ) => {
    return (
      !!user &&
      user.id === meeting.hostId
    );
  };

  isUserParticipatingEvent = (
    user: User,
    meeting: Meeting,
    year = MEMORIAL_YEAR
  ) => {
    if (!meeting) {
      return false;
    }

    return (
      this.isParticipateParticipatingEvent(user, meeting, year) ||
      this.isBereavedParticipatingEvent(user, meeting, year) ||
      this.isHostParticipatingEvent(user, meeting)
    );
  };

  isUserCanParticipatingEvent = (
    user: User,
    meeting: Meeting
  ) => {
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

  isBereavedCanParticipatingEvent = (user: User, meeting: Meeting) => {
    return this.isBereavedHaveAllDetails(user) &&
      this.isBrotherHaveSlainDetails(user) &&
      this.isBrotherAnsweredTrainingMeeting(user) &&
      !meeting.bereaved
  }

  isParticipateCanParticipatingEvent = (user: User, meeting: Meeting) => {
    return this.isParticipateHaveAllDetails(user) &&
      !meeting.invited &&
      meeting.count <= meeting.capacity
  }

  isUserHaveAllDetails = (user: User) => {
    if (!user) {
      return false;
    }

    if (user.role === UserRole.bereaved) {
      return this.isBereavedHaveAllDetails(user);
    } else {
      return this.isParticipateHaveAllDetails(user);
    }
  }

  isParticipateHaveAllDetails = (user: User) => {
    return !!(
      user &&
      user.profile &&
      user.profile.email &&
      user.profile.firstName &&
      user.profile.lastName &&
      user.profile.phoneNumber
    );
  };

  isBereavedHaveAllDetails = (user: User) => {
    return !!(
      user &&
      user.profile &&
      user.profile.address &&
      user.profile.email &&
      user.profile.firstName &&
      user.profile.lastName &&
      user.profile.phoneNumber &&
      user.profile.birthDay
    );
  };

  isBrotherHaveSlainDetails = (user: User) => {
    return user.bereavedProfile;
  };

  isBrotherAnsweredTrainingMeeting = (user: User, year = MEMORIAL_YEAR) => {
    return (
      user.bereavedParticipation &&
      user.bereavedParticipation[year] &&
      user.bereavedParticipation[year].guidance &&
      user.bereavedParticipation[year].guidance.answered
    );
  };
}
