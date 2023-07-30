import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequetesListComponent } from './requetes-list.component';

describe('RequetesListComponent', () => {
  let component: RequetesListComponent;
  let fixture: ComponentFixture<RequetesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequetesListComponent]
    });
    fixture = TestBed.createComponent(RequetesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
