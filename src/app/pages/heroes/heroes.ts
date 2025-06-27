import { Component, inject, signal, Signal } from '@angular/core';
import { HeroesListComponent } from '../../components/heroes-list/heroes-list.component';
import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.scss'],
  imports: [HeroesListComponent],
})
export class HeroesComponent {
  searchQuery = signal('');
  heroesPage: Signal<Heroe[]>;
  totalFilters: Signal<number>;
  pageSignal: Signal<number> = signal(1);
  limitPageSignal: Signal<number>;
  private readonly router = inject(Router);
  private readonly heroesSvc = inject(HeroesService);
  constructor() {
    this.heroesPage = this.heroesSvc.heroesPage;
    this.totalFilters = this.heroesSvc.totalFilters;
    this.pageSignal = this.heroesSvc.page;
    this.limitPageSignal = this.heroesSvc.limit;
  }

  searchHeroeName(name: string): void {
    this.heroesSvc.searchWithName.set(name);
    this.heroesSvc.page.set(1);
  }

  searchHeroeForId(id: string): void {
    this.heroesSvc.searchWithId.set(id);
    this.heroesSvc.page.set(1);
  }

  changePage(page: number): void {
    this.heroesSvc.page.set(page + 1);
  }

  goToEditHeroe(heroeId: number): void {
    this.router.navigate(['/heroe', heroeId]);
  }

  deleteHero(heroeId: number): void {
    this.heroesSvc.removeHeroe(heroeId);
  }

  goToAddHeroe(): void {
    this.router.navigate(['/add-heroe']);
  }

}
