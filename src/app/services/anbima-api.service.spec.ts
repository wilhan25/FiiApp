import { TestBed } from '@angular/core/testing';

import { AnbimaApiService } from './anbima-api.service';

describe('AnbimaApiService', () => {
  let service: AnbimaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnbimaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
