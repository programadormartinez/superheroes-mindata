import { Component, inject } from '@angular/core';
import { HeroeAdd } from '../../components/heroe-add/heroe-add';
import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-heroe',
  imports: [HeroeAdd],
  templateUrl: './add-heroe.html',
  styleUrl: './add-heroe.scss',
})
export class AddHeroe {
  private heroeSvc = inject(HeroesService);
  private router = inject(Router);
  constructor() {}
  saveHeroe(heroe: Omit<Heroe, 'id'> | null): void {
    if (heroe) {
      this.heroeSvc.addHeroe(heroe);
    }
    this.router.navigate(['/']);
  }
}
