import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipementComponent } from './edit-equipement.component';

describe('EditEquipementComponent', () => {
  let component: EditEquipementComponent;
  let fixture: ComponentFixture<EditEquipementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEquipementComponent]
    });
    fixture = TestBed.createComponent(EditEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
