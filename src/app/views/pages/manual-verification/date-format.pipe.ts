import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  
  transform(value: number): string {
    if (!value) return '';
    
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    return date.toLocaleString('en-GB', options).replace(',', '').replace('T', ' ');
  }
}
