import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFonctionnaireComponent } from './add-fonctionnaire.component';

describe('AddFonctionnaireComponent', () => {
  let component: AddFonctionnaireComponent;
  let fixture: ComponentFixture<AddFonctionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFonctionnaireComponent]
    });
    fixture = TestBed.createComponent(AddFonctionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
