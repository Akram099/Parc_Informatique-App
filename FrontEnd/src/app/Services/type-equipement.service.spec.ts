import { TestBed } from '@angular/core/testing';

import { TypeEquipementService } from './type-equipement.service';

describe('TypeEquipementService', () => {
  let service: TypeEquipementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEquipementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
