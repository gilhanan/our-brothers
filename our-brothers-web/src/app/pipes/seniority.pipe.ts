import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seniority'
})
export class SeniorityPipe implements PipeTransform {

  transform(date: number): any {
    const diff = new Date(Date.now() - date);
    return Math.abs(diff.getUTCFullYear() - 1970);
  }
}
