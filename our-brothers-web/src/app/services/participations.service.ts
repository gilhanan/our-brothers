import { Injectable } from '@angular/core';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationsService {

  constructor() { }

  isParticipateParticipating = (user: User, year: number) => {
    return !!user && !!user.participateParticipation && !!user.participateParticipation[year] && !!user.participateParticipation[year].events &&
      !!user.participateParticipation[year].events.length;
  };

  isBereavedParticipating = (user: User, year: number) => {
    return !!user && !!user.bereavedParticipation && !!user.bereavedParticipation[year] && !!user.bereavedParticipation[year].events &&
      !!user.bereavedParticipation[year].events.length;
  };

  isHostParticipating = (user: User, year: number) => {
    return !!user && !!user.hostParticipation && !!user.hostParticipation[year] && !!user.hostParticipation[year].event;
  };

  isUserParticipating = (user: User, year: number) => {
    return this.isParticipateParticipating(user, year) || this.isBereavedParticipating(user, year) || this.isHostParticipating(user, year);
  };

  isParticipateParticipatingEvent = (user: User, year: number, eventId: string) => {
    return !!user && !!user.participateParticipation && !!user.participateParticipation[year] && !!user.participateParticipation[year].events &&
      user.participateParticipation[year].events.some((e) => e.event === eventId);
  };

  isBereavedParticipatingEvent = (user: User, year: number, eventId: string) => {
    return !!user && !!user.bereavedParticipation && !!user.bereavedParticipation[year] && !!user.bereavedParticipation[year].events &&
      user.bereavedParticipation[year].events.some((e) => e.event === eventId);
  };

  isHostParticipatingEvent = (user: User, year: number, eventId: string) => {
    return !!user && !!user.hostParticipation && !!user.hostParticipation[year] && user.hostParticipation[year].event === eventId;
  };

  isUserParticipatingEvent = (user: User, year: number, eventId: string) => {
    return this.isParticipateParticipatingEvent(user, year, eventId) ||
      this.isBereavedParticipatingEvent(user, year, eventId) ||
      this.isHostParticipatingEvent(user, year, eventId);
  };
}
