import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPetComponent } from './admin-pet.component';

describe('AdminPetComponent', () => {
  let component: AdminPetComponent;
  let fixture: ComponentFixture<AdminPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
