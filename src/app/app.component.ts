import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImmuFormComponent } from './components/immu-form/immu-form.component';
import { greedyFindCriteria } from './immu-logic/calculations';
import { CRITERIA } from './immu-logic/criteria';
import { ImmuResultComponent } from './components/immu-result/immu-result.component';
import { ImmuResult } from './immu-logic/types';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ImmuCriteriaComponent } from "./components/immu-criteria/immu-criteria.component";

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
    imports: [CommonModule, RouterOutlet, ImmuFormComponent, ImmuResultComponent, ImmuCriteriaComponent]
})
export class AppComponent {
  resultMinAppointments = signal<ImmuResult | undefined>(undefined);
  resultMaxPoints = signal<ImmuResult | undefined>(undefined);
  criteria = CRITERIA;

  onImmuWsProvided(input: string[]) {
    this.resultMinAppointments.set(greedyFindCriteria(input, this.criteria, 'minAppointments'));
    this.resultMaxPoints.set(greedyFindCriteria(input, this.criteria, 'maxPoints'));
  }
}
