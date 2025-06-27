import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeAdd } from './heroe-add';

describe('HeroeAdd', () => {
  let component: HeroeAdd;
  let fixture: ComponentFixture<HeroeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroeAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroeAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
