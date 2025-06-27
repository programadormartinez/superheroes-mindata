import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Heroe } from '../models/heroe';
import { HEROES_MOCK_DATA } from '../data/heroes.mock';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial heroes', () => {
    expect(service.heroesPage().length).toBe(HEROES_MOCK_DATA.data.length);
  });

  it('should add a hero', () => {
    const newHero: Omit<Heroe, 'id'> = { name: 'Test Hero', power: 'Test Power', universe: 'Test Universe' };
    service.addHeroe(newHero);
    expect(service.heroesPage().length).toBe(HEROES_MOCK_DATA.data.length + 1);
    expect(service.heroesPage().some(h => h.name === 'Test Hero')).toBe(true);
  });

  it('should remove a hero', () => {
    const heroToRemove = service.heroesPage()[0];
    service.removeHeroe(heroToRemove.id);
    expect(service.heroesPage().length).toBe(HEROES_MOCK_DATA.data.length - 1);
    expect(service.heroesPage().some(h => h.id === heroToRemove.id)).toBe(false);
  });

  it('should edit a hero', () => {
    const heroToEdit = service.heroesPage()[0];
    const updatedHero = { ...heroToEdit, name: 'Updated Hero' };
    service.editHeroe(updatedHero);
    const editedHero = service.heroesPage().find(h => h.id === heroToEdit.id);
    expect(editedHero?.name).toBe('Updated Hero');
  });

  it('should filter heroes by name', () => {
    service.searchWithName.set('man');
    expect(service.filterHeroes().every(h => h.name.toLowerCase().includes('man'))).toBe(true);
  });

  it('should filter heroes by id', () => {
    service.searchWithId.set('1');
    expect(service.filterHeroes().every(h => h.id.toString().includes('1'))).toBe(true);
  });

  it('should paginate heroes', () => {
    service.limit.set(5);
    service.page.set(2);
    const expectedHeroes = service.filterHeroes().slice(5, 10);
    expect(service.heroesPage()).toEqual(expectedHeroes);
  });
});
