import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDop'
})
export class CurrencyDopPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return 'RD$0.00';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return 'RD$0.00';
    }

    
    const formatted = numValue.toLocaleString('es-DO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `RD$${formatted}`;
  }
}