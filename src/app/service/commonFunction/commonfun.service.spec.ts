import { TestBed } from '@angular/core/testing';

import { CommonfunService } from './commonfun.service';

describe('CommonfunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonfunService = TestBed.get(CommonfunService);
    expect(service).toBeTruthy();
  });
});
