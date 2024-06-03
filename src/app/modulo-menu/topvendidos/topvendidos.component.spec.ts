import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopvendidosComponent } from './topvendidos.component';

describe('TopvendidosComponent', () => {
  let component: TopvendidosComponent;
  let fixture: ComponentFixture<TopvendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopvendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopvendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
