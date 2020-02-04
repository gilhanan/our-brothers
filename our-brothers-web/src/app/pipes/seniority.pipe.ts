import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seniority'
})
export class SeniorityPipe implements PipeTransform {

  transform(date: number): any {
    const diff = new Date(Date.now() - date);

    const years = Math.abs(diff.getUTCFullYear() - 1970);

    if (!years) {
      return !diff.getMonth() ? .1 : (diff.getMonth() / 12).toFixed(1);
    } else {
      return years;
    }
  }
}
