import { TestBed } from '@angular/core/testing';

import { InitialisingService } from './initialising.service';

describe('InitialisingService', () => {
  let service: InitialisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
