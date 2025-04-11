import { TestBed } from '@angular/core/testing';

import { GovernratesService } from './governrates.service';

describe('GovernratesService', () => {
  let service: GovernratesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernratesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
