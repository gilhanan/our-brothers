import { Injectable } from '@angular/core';
import { User, Meeting } from '../model';
import { MEMORIAL_YEAR } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationsService {

  constructor() { }

  isParticipateParticipating = (user: User, year: number) => {
    return !!user && !!user.participateParticipation && !!user.participateParticipation[year] && !!user.participateParticipation[year].meetings &&
      !!user.participateParticipation[year].meetings.length;
  };

  isBereavedParticipating = (user: User, year: number) => {
    return !!user && !!user.bereavedParticipation && !!user.bereavedParticipation[year] && !!user.bereavedParticipation[year].meetings &&
      !!user.bereavedParticipation[year].meetings.length;
  };

  isHostParticipating = (user: User, year: number) => {
    return !!user && !!user.hostParticipation && !!user.hostParticipation[year] && !!user.hostParticipation[year].meetings &&
      !!user.hostParticipation[year].meetings.length;;
  };

  isUserParticipating = (user: User, year: number) => {
    return this.isParticipateParticipating(user, year) || this.isBereavedParticipating(user, year) || this.isHostParticipating(user, year);
  };

  isParticipateParticipatingEvent = (user: User, meeting: Meeting, year = MEMORIAL_YEAR) => {
    return !!user && !!user.participateParticipation && !!user.participateParticipation[year] && !!user.participateParticipation[year].meetings &&
      user.participateParticipation[year].meetings.some((e) => e.id === meeting.id && e.hostId === meeting.hostId);
  };

  isBereavedParticipatingEvent = (user: User, meeting: Meeting, year = MEMORIAL_YEAR) => {
    return !!user && !!user.bereavedParticipation && !!user.bereavedParticipation[year] && !!user.bereavedParticipation[year].meetings &&
      user.bereavedParticipation[year].meetings.some((e) => e.id === meeting.id && e.hostId === meeting.hostId);
  };

  // TODO: Replaced by user.id === meeting.hostId ?
  isHostParticipatingEvent = (user: User, meeting: Meeting, year = MEMORIAL_YEAR) => {
    return !!user && !!user.hostParticipation && !!user.hostParticipation[year] && !!user.hostParticipation[year].meetings &&
      user.hostParticipation[year].meetings.some((e) => e.id === meeting.id);
  };

  isUserParticipatingEvent = (user: User, meeting: Meeting, year = MEMORIAL_YEAR) => {
    return this.isParticipateParticipatingEvent(user, meeting, year) ||
      this.isBereavedParticipatingEvent(user, meeting, year) ||
      this.isHostParticipatingEvent(user, meeting);
  };
}
