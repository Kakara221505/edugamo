import { TestBed } from '@angular/core/testing';

import { ManualVerificationService } from './manual-verification.service';

describe('ManualVerificationService', () => {
  let service: ManualVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
