import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  ],
  templateUrl: 'immu-form.component.html',
  styleUrl: './immu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmuFormComponent {
  @Output() immuWsProvided = new EventEmitter<string[]>();

  immuWs = new FormControl('');
  immuForm = new FormGroup({
    immuWs: this.immuWs,
  });

  onSubmit() {
    const roughInput = this.immuWs.value;

    if (roughInput) {
      const input = roughInput.trim().split(' ');
      this.immuWsProvided.emit(input);
    }
  }
}
