import { Pipe, type PipeTransform } from '@angular/core';
import { POINT_TO_PLN } from '../immu-logic/criteria';

@Pipe({
  name: 'appPointsToPln',
  standalone: true,
})
export class PointsToPlnPipe implements PipeTransform {

  transform(value: number, currency = "zł"): string {
    return (value * POINT_TO_PLN).toFixed(2) + currency;
  }

}
