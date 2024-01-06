import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ConditionFormatterPipe } from "../../pipes/condition-formatter.pipe";
import { Suggestion } from '../../immu-logic/types';

@Component({
    selector: 'app-immu-suggestions',
    standalone: true,
    templateUrl: 'immu-suggestions.component.html',
    styleUrl: './immu-suggestions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule, MatCardModule,
        ConditionFormatterPipe
    ]
})
export class ImmuSuggestionsComponent {
  @Input() suggestions?: Suggestion[];
}
