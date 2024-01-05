import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal,
} from '@angular/core';
import { ImmuResult } from '../../immu-logic/types';
import { POINT_TO_PLN } from '../../immu-logic/criteria';
import { MatCardModule } from '@angular/material/card';
import { ConditionFormatterPipe } from "../../pipes/condition-formatter.pipe";

@Component({
    selector: 'app-immu-result',
    standalone: true,
    templateUrl: 'immu-result.component.html',
    styleUrl: './immu-result.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatCardModule, ConditionFormatterPipe]
})
export class ImmuResultComponent {
  POINT_TO_PLN = POINT_TO_PLN;

  immuResultSignal = signal<ImmuResult | undefined>(undefined);
  @Input() set immuResult(value: ImmuResult | undefined) {
    this.immuResultSignal.set(value);
  }

  @Input() headerText: string = '';

  sum = computed(
    () =>
      (Math.round(
        this.immuResultSignal()?.groups?.reduce(
          (acc, val) => (acc += val.value),
          0
        ) || 0
      ) *
        100) /
      100
  );

  unused = computed(() => this.immuResultSignal()?.unused?.join(', '));
}
