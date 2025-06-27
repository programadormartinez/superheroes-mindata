import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroe } from './add-heroe';

describe('AddHeroe', () => {
  let component: AddHeroe;
  let fixture: ComponentFixture<AddHeroe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeroe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
