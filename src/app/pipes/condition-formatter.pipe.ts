import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appConditionFormatter',
  standalone: true,
})
export class ConditionFormatterPipe implements PipeTransform {
  transform(conditions: string[]): string {
    const dictionary = conditions.reduce((acc, val) => {
      if (val in acc) acc[val] += 1;
      else acc[val] = 1;

      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(dictionary)
      .map((condition) => `${dictionary[condition]} x ${condition}`)
      .join(', ');
  }
}
