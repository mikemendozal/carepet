import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleveryComponent } from './delevery.component';

describe('DeleveryComponent', () => {
  let component: DeleveryComponent;
  let fixture: ComponentFixture<DeleveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
