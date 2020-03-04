import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'models';
import { SortedColumn } from '../../../shared/components/list/list-header/list-header.types';

const getFullName = (user: User, year: number) => (user.profile ? user.profile.firstName + user.profile.lastName : '');
const getSeniority = (user: User, year: number) => user.bereavedProfile?.slains?.[0]?.deathDate || Number.MAX_VALUE;
const getGuidance = (user: User, year: number) => user.bereavedParticipation?.[year]?.guidance?.general || '';
const getStatus = (user: User, year: number) => user.bereavedParticipation?.[year]?.status || '';
const getMeetings = (user: User, year: number) => user.bereavedParticipation?.[year]?.meetings?.length || 0;

const valueGetter = {
  name: getFullName,
  seniority: getSeniority,
  guidance: getGuidance,
  status: getStatus,
  meetings: getMeetings
};

@Pipe({
  name: 'sortBereaveds'
})
export class SortBereavedsPipe implements PipeTransform {
  transform(bereaveds: User[], { column, direction }: SortedColumn, year: number): User[] {
    if (!column) {
      return bereaveds;
    }
    return bereaveds.slice().sort((a, b) => {
      let aValue = column in valueGetter ? valueGetter[column](a, year) : a[column] || '';
      let bValue = column in valueGetter ? valueGetter[column](a, year) : a[column] || '';

      if (direction === 'desc') {
        [aValue, bValue] = [bValue, aValue];
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return aValue.toString().localeCompare(bValue);
    });
  }
}
