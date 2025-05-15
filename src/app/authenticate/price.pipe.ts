import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {
  transform(value: number, currencySymbol: string = 'Rs. '): string {
    if (isNaN(value)) return '';
    return currencySymbol + value.toLocaleString('en-PK');
  }
}