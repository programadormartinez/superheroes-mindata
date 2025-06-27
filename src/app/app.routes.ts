import { Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes';
import { HeroeComponent } from './pages/heroe/heroe';
import { AddHeroe } from './pages/add-heroe/add-heroe';

export const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
  {
    path: 'heroe/:id',
    component: HeroeComponent,
  },
  {
    path: 'add-heroe',
    component: AddHeroe,
  },
];
