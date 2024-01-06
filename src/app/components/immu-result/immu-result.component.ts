import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ImmuResult } from '../../immu-logic/types';
import { ConditionFormatterPipe } from '../../pipes/condition-formatter.pipe';
import { PointsToPlnPipe } from '../../pipes/points-to-pln.pipe';

@Component({
  selector: 'app-immu-result',
  standalone: true,
  templateUrl: 'immu-result.component.html',
  styleUrl: './immu-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    ConditionFormatterPipe,
    PointsToPlnPipe,
  ],
})
export class ImmuResultComponent {
  immuResultSignal = signal<ImmuResult | undefined>(undefined);
  @Input() set immuResult(value: ImmuResult | undefined) {
    this.immuResultSignal.set(value);
  }

  @Input() headerText: string = '';

  sum = computed(
    () =>
      this.immuResultSignal()?.groups?.reduce(
        (acc, val) => (acc += val.value),
        0
      ) || 0
  );
}
