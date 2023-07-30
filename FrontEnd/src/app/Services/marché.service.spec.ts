import { TestBed } from '@angular/core/testing';

import { MarchéService } from './marché.service';

describe('MarchéService', () => {
  let service: MarchéService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarchéService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
