import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'models';
import { SortedColumn } from '../../../shared/components/list/list-header/list-header.types';

const getFirstName = (user: User) => (user.profile ? user.profile.firstName : '');
const getLastName = (user: User) => (user.profile ? user.profile.lastName : '');
const getEmail = (user: User) => (user.profile ? user.profile.email : '');
const getPhoneNumber = (user: User) => (user.profile ? user.profile.phoneNumber : '');

const valueGetter = {
  firstName: getFirstName,
  lastName: getLastName,
  email: getEmail,
  phoneNumber: getPhoneNumber
};
const getValue = (user: User, column) => (column in valueGetter ? valueGetter[column](user) : user[column] || '');

@Pipe({
  name: 'sortUsers'
})
export class SortUsersPipe implements PipeTransform {
  transform(users: User[], { column, direction }: SortedColumn): User[] {
    if (!column) {
      return users;
    }
    return users.slice().sort((a, b) => {
      let aValue = getValue(a, column);
      let bValue = getValue(b, column);

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
