import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionnairesListComponent } from './fonctionnaires-list.component';

describe('FonctionnairesListComponent', () => {
  let component: FonctionnairesListComponent;
  let fixture: ComponentFixture<FonctionnairesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FonctionnairesListComponent]
    });
    fixture = TestBed.createComponent(FonctionnairesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
