import { TestBed } from '@angular/core/testing';

import { CaractéristiqueService } from './caractéristique.service';

describe('CaractéristiqueService', () => {
  let service: CaractéristiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaractéristiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
