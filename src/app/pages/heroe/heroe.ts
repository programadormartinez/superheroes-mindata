import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { HeroeEditComponent } from '../../components/heroe-edit/heroe-edit';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.html',
  styleUrls: ['./heroe.css'],
  imports: [HeroeEditComponent],
})
export class HeroeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly heroesSvc = inject(HeroesService);
  private readonly router = inject(Router);
  readonly heroeId = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')))),
    { initialValue: 0 }
  );

  readonly heroe = computed<Heroe | undefined>(() =>
    this.heroesSvc.filterHeroes().find((h) => h.id === this.heroeId())
  );
  constructor() {
    effect(() => {
      if (!this.heroe()) {
        this.router.navigate(['/']);
      }
    });
  }

  saveHeroe($event: any): void {
    if (!$event) {
      this.router.navigate(['/']);
      return;
    }
    const heroeUpdate: Heroe = {
      ...this.heroe()!,
      ...$event,
    };
    this.heroesSvc.editHeroe(heroeUpdate);
    this.router.navigate(['/']);
  }
}
