import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Heroe } from '../../models/heroe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UppercaseDirective } from '../../directives/uppercase.directive';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.html',
  styleUrls: ['./heroe-edit.scss'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    UppercaseDirective,
  ],
})
export class HeroeEditComponent {
  private readonly fb = inject(FormBuilder);
  readonly heroe = input<Heroe | undefined>(undefined);
  outputHeroe = output<Heroe | null>();
  readonly form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    power: ['', Validators.required],
    universe: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const heroe = this.heroe();
      if (heroe) {
        this.form.patchValue({
          name: heroe.name,
          power: heroe.power,
          universe: heroe.universe,
        });
      } else {
        this.form.reset();
      }
    });
  }
  saveHeroe(): void {
    if (this.form.invalid || !this.heroe()) return;

    const heroeUpdate: Heroe = {
      ...this.heroe()!,
      ...this.form.value,
    };
    this.outputHeroe.emit(heroeUpdate);
  }

  cancelEdit(): void {
    this.outputHeroe.emit(null);
  }
}
