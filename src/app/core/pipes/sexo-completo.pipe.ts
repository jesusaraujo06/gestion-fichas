import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexocompleto',
  standalone: true
})
export class SexoCompletoPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'M') {
      return 'MASCULINO';
    } else if (value === 'F') {
      return 'FEMENINO';
    } else {
      return value;
    }
  }

}
