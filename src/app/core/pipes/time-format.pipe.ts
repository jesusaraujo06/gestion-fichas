import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Parse the time string
    const [hours, minutes] = value.split(':');
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    // Determine AM/PM suffix
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Format the time string
    const formattedTime = `${this.pad(hour)}:${this.pad(minute)} ${ampm}`;
    return formattedTime;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
