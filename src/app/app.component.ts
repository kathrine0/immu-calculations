import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImmuFormComponent } from './components/immu-form/immu-form.component';
import { greedyFindCriteria } from './immu-logic/calculations';
import { CRITERIA } from './immu-logic/criteria';
import { ImmuResultComponent } from './components/immu-result/immu-result.component';
import { ImmuResult } from './immu-logic/types';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ImmuCriteriaComponent } from './components/immu-criteria/immu-criteria.component';
import { ImmuSuggestionsComponent } from './components/immu-suggestions/immu-suggestions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ImmuFormComponent,
    ImmuResultComponent,
    ImmuCriteriaComponent,
    ImmuSuggestionsComponent,
  ],
})
export class AppComponent {
  // results = signal<Array<{ result: ImmuResult; title: string }>>([])
  private resultMinAppointments = signal<ImmuResult | undefined>(undefined);
  private resultMaxPoints = signal<ImmuResult | undefined>(undefined);

  criteria = CRITERIA;

  minAppointmentsTitle = 'Opcja najmniej wizyt';
  maxPointsTitle = 'Opcja najwięcej punktów';
  genericTitle = 'Propozycja rozliczenia';

  onImmuWsProvided(input: string[]) {
    this.resultMinAppointments.set(
      greedyFindCriteria(input, this.criteria, 'minAppointments')
    );
    this.resultMaxPoints.set(
      greedyFindCriteria(input, this.criteria, 'maxPoints')
    );
  }

  results = computed(() =>
    this.resultMinAppointments()?.groups?.length ===
    this.resultMaxPoints()?.groups?.length
      ? [
          {
            result: this.resultMinAppointments(),
            title: this.genericTitle,
          },
        ]
      : [
          {
            result: this.resultMinAppointments(),
            title: this.minAppointmentsTitle,
          },
          {
            result: this.resultMaxPoints(),
            title: this.maxPointsTitle,
          },
        ]
  );

  suggestions = computed(() => {
    const suggestions = this.results().map(({ result }) => result?.suggestions);
    const stringifiedSuggestions = suggestions.map(s => JSON.stringify(s));
    const filteredSuggestions = suggestions.filter(
      (s, index) => stringifiedSuggestions.indexOf(JSON.stringify(s)) === index
    );

    return filteredSuggestions;
  });
}
