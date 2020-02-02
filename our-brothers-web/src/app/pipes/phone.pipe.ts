import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  public transform(phoneNumber: string): any {
    if (!phoneNumber || phoneNumber.length < 9) {
      return phoneNumber;
    } else {
      phoneNumber = phoneNumber.replace(/\+9720?/, '');
      return `0${phoneNumber.substring(0, 2)}-${phoneNumber.substring(2, 5)}-${phoneNumber.substring(5)}`;
    }
  }

}
