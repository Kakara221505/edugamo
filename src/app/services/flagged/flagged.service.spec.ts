import { TestBed } from '@angular/core/testing';

import { FlaggedService } from './flagged.service';

describe('FlaggedService', () => {
  let service: FlaggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
