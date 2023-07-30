import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFonctionnaireComponent } from './edit-fonctionnaire.component';

describe('EditFonctionnaireComponent', () => {
  let component: EditFonctionnaireComponent;
  let fixture: ComponentFixture<EditFonctionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFonctionnaireComponent]
    });
    fixture = TestBed.createComponent(EditFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
