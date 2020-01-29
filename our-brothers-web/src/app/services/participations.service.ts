import { Injectable } from '@angular/core';
import { User } from '../model';

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

  isParticipateParticipatingEvent = (user: User, year: number, meetingId: string) => {
    return !!user && !!user.participateParticipation && !!user.participateParticipation[year] && !!user.participateParticipation[year].meetings &&
      user.participateParticipation[year].meetings.some((e) => e.id === meetingId);
  };

  isBereavedParticipatingEvent = (user: User, year: number, meetingId: string) => {
    return !!user && !!user.bereavedParticipation && !!user.bereavedParticipation[year] && !!user.bereavedParticipation[year].meetings &&
      user.bereavedParticipation[year].meetings.some((e) => e.id === meetingId);
  };

  isHostParticipatingEvent = (user: User, year: number, meetingId: string) => {
    return !!user && !!user.hostParticipation && !!user.hostParticipation[year] && !!user.hostParticipation[year].meetings &&
      user.hostParticipation[year].meetings.some((e) => e.id === meetingId);
  };

  isUserParticipatingEvent = (user: User, year: number, meetingId: string) => {
    return this.isParticipateParticipatingEvent(user, year, meetingId) ||
      this.isBereavedParticipatingEvent(user, year, meetingId) ||
      this.isHostParticipatingEvent(user, year, meetingId);
  };
}
