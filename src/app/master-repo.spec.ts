import { TestBed } from '@angular/core/testing';

import { MasterRepo } from './master-repo';

describe('MasterRepo', () => {
  let service: MasterRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
