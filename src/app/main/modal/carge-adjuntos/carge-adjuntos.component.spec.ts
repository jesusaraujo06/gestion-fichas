import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargeAdjuntosComponent } from './carge-adjuntos.component';

describe('CargeAdjuntosComponent', () => {
  let component: CargeAdjuntosComponent;
  let fixture: ComponentFixture<CargeAdjuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CargeAdjuntosComponent]
    });
    fixture = TestBed.createComponent(CargeAdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
