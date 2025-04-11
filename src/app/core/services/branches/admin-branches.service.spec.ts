import { TestBed } from '@angular/core/testing';

import { AdminBranchesService } from './admin-branches.service';

describe('AdminBranchesService', () => {
  let service: AdminBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
