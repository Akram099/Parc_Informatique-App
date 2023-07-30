import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequeteComponent } from './add-requete.component';

describe('AddRequeteComponent', () => {
  let component: AddRequeteComponent;
  let fixture: ComponentFixture<AddRequeteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRequeteComponent]
    });
    fixture = TestBed.createComponent(AddRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
