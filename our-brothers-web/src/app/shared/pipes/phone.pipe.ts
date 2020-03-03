import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  constructor(
    private utilsService: UtilsService
  ) { }

  public transform(phoneNumber: string): string {
    if (!phoneNumber || phoneNumber.length < 9) {
      return phoneNumber;
    } else {
      const local = this.utilsService.toLocalPhoneNumber(phoneNumber);
      return `${local.substring(0, 3)}-${local.substring(3, 6)}-${local.substring(6)}`;
    }
  }

}
