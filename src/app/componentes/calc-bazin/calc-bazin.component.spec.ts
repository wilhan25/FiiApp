import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcBazinComponent } from './calc-bazin.component';

describe('CalcBazinComponent', () => {
  let component: CalcBazinComponent;
  let fixture: ComponentFixture<CalcBazinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcBazinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcBazinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
