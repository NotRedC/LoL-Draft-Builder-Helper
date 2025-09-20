import { TestBed } from '@angular/core/testing';

import { Champion } from './champion';

describe('Champion', () => {
  let service: Champion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Champion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
