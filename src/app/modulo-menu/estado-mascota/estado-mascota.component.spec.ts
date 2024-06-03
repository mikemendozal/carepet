import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoMascotaComponent } from './estado-mascota.component';

describe('EstadoMascotaComponent', () => {
  let component: EstadoMascotaComponent;
  let fixture: ComponentFixture<EstadoMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
