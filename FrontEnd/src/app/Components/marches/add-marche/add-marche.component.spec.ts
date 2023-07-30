import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarcheComponent } from './add-marche.component';

describe('AddMarcheComponent', () => {
  let component: AddMarcheComponent;
  let fixture: ComponentFixture<AddMarcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMarcheComponent]
    });
    fixture = TestBed.createComponent(AddMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
