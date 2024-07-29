import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaSimple',
  standalone: true
})
export class FechaSimplePipe implements PipeTransform {

  transform(value: string): string {
    console.log('FechaSimplePipe', value);
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return ''; // Verifica si la fecha es válida

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}
