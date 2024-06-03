import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarCitaComponent } from './autorizar-cita.component';

describe('AutorizarCitaComponent', () => {
  let component: AutorizarCitaComponent;
  let fixture: ComponentFixture<AutorizarCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
