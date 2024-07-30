 import { Pipe, PipeTransform } from '@angular/core';
 import { format, parse } from 'date-fns';
 import { es } from 'date-fns/locale';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    const dateParts = value.split(' ')[0].split('/');
    const day = dateParts[0];
    const month = parseInt(dateParts[1], 10) - 1; // Ajustamos el índice del mes
    const year = dateParts[2];

    return `${day} de ${this.monthNames[month]} de ${year}`;
  }

  private readonly monthNames: string[] = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

}
