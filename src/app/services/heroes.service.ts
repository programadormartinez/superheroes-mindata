// src/app/services/heroes-store.service.ts
import { Injectable, Signal, signal, computed, effect } from '@angular/core';
import { Heroe } from '../models/heroe';
import { HEROES_MOCK_DATA } from '../data/heroes.mock';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private readonly _heroes = signal<Heroe[]>(HEROES_MOCK_DATA.data);

  readonly searchWithName = signal<string>('');
  readonly searchWithId = signal<string>('');
  readonly page = signal<number>(1);
  readonly limit = signal<number>(HEROES_MOCK_DATA.limit);

  readonly filterHeroes: Signal<Heroe[]> = computed(() => {
    const termName = this.searchWithName().toLowerCase();
    const termId = this.searchWithId().toLowerCase();
    return this._heroes().filter(
      (h) =>
        h.name.toLowerCase().includes(termName) &&
        h.id.toString().includes(termId)
    );
  });

  readonly totalFilters = computed(() => this.filterHeroes().length);

  readonly heroesPage: Signal<Heroe[]> = computed(() => {
    const start = (this.page() - 1) * this.limit();
    return this.filterHeroes().slice(start, start + this.limit());
  });

  addHeroe(hero: Omit<Heroe, 'id'>): void {
    const maxId = this._heroes().reduce((max, h) => (h.id > max ? h.id : max), 0);
    const newHeroe: Heroe = { id: maxId + 1, ...hero };
    this._heroes.update((list) => [...list, newHeroe]);
  }

  removeHeroe(id: number): void {
    this._heroes.update((list) => list.filter((h) => h.id !== id));
  }

  editHeroe(hero: Heroe): void {
    this._heroes.update((list) => {
      const index = list.findIndex((h) => h.id === hero.id);
      if (index !== -1) {
        list[index] = hero;
      }
      return [...list];
    });
  }

  refreshHeroes(): void {
    this._heroes.update(list => [...list]);
  }

  constructor() {
    effect(() => {
      const totalEnPagina = this.heroesPage().length;
      if (totalEnPagina === 0 && this.page() > 1) {
        this.page.set(1);
      }
    });
  }
}
