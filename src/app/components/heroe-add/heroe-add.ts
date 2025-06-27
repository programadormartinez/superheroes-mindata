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
  selector: 'app-heroe-add',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    UppercaseDirective,
  ],
  templateUrl: './heroe-add.html',
  styleUrl: './heroe-add.scss',
})
export class HeroeAdd {
  private readonly fb = inject(FormBuilder);

  readonly form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    power: ['', Validators.required],
    universe: ['', Validators.required],
  });

  outputHeroe = output<Omit<Heroe, 'id'> | null>();


  cancelAdd(): void {
    this.outputHeroe.emit(null);
  }
  saveHeroe(): void {
    if (this.form.valid) {
      const newHeroe: Omit<Heroe, 'id'> = {
        name: this.form.value.name!,
        power: this.form.value.power!,
        universe: this.form.value.universe!,
      };
      this.outputHeroe.emit(newHeroe);
    } else {
      this.outputHeroe.emit(null);
    }
  }
}
