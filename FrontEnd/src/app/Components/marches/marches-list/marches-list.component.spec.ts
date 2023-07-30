import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchesListComponent } from './marches-list.component';

describe('MarchesListComponent', () => {
  let component: MarchesListComponent;
  let fixture: ComponentFixture<MarchesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarchesListComponent]
    });
    fixture = TestBed.createComponent(MarchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
