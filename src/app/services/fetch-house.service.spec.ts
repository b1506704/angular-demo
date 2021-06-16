import { TestBed } from '@angular/core/testing';

import { FetchHouseService } from './fetch-house.service';

describe('FetchHouseService', () => {
  let service: FetchHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
