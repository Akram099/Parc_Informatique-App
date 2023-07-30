import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarcheComponent } from './edit-marche.component';

describe('EditMarcheComponent', () => {
  let component: EditMarcheComponent;
  let fixture: ComponentFixture<EditMarcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMarcheComponent]
    });
    fixture = TestBed.createComponent(EditMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
