import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargeFormulariosComponent } from './carge-formularios.component';

describe('CargeFormulariosComponent', () => {
  let component: CargeFormulariosComponent;
  let fixture: ComponentFixture<CargeFormulariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CargeFormulariosComponent]
    });
    fixture = TestBed.createComponent(CargeFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
