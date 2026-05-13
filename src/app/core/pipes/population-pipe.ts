import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population',
})
export class PopulationPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    let suffix: string = '';
    if (value >= 1_000_000_000) {
      suffix = 'bi'
      return (value / 1000000000).toFixed(1).toString() + ` ${suffix}`
    }
    if (value >= 1_000_000) {
      suffix = 'mi'
      return (value / 1000000).toFixed(1).toString() + ` ${suffix}`
    }
    if (value >= 1_000) {
      suffix = 'mil'
      return (value / 1000).toFixed(1).toString() + ` ${suffix}`
    }
    return ''
  }
}
