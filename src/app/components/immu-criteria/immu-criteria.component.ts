import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Criterium } from '../../immu-logic/types';
import { ConditionFormatterPipe } from "../../pipes/condition-formatter.pipe";

@Component({
    selector: 'app-immu-criteria',
    standalone: true,
    templateUrl: 'immu-criteria.component.html',
    styleUrl: './immu-criteria.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatCardModule, ConditionFormatterPipe]
})
export class ImmuCriteriaComponent {
  @Input() criteria: Criterium[] = [];
}
