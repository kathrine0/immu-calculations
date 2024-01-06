import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-immu-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: 'immu-form.component.html',
  styleUrl: './immu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmuFormComponent {
  @Output() immuWsProvided = new EventEmitter<string[]>();

  immuWs: Array<{ name: string }> = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [COMMA, SPACE, ENTER] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '')
      .trim()
      .split(' ')
      .map((el) => el.trim())
      .filter((el) => !!el);

    if (value.length) {
      this.immuWs.push(...value.map((v) => ({ name: v })));
    }

    event.chipInput!.clear();
    this.submit();
  }

  remove(w: { name: string }): void {
    const index = this.immuWs.indexOf(w);

    if (index >= 0) {
      this.immuWs.splice(index, 1);
      this.submit();
    }
  }

  edit(w: { name: string }, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(w);
      return;
    }

    const index = this.immuWs.indexOf(w);
    if (index >= 0) {
      this.immuWs[index].name = value;
      this.submit();
    }
  }

  submit() {
    const input = this.immuWs.map((w) => w.name);
    this.immuWsProvided.emit(input);
  }
}
