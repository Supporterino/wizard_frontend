import { TestBed } from '@angular/core/testing';

import { LocalItemService } from './local-item.service';

describe('LocalItemService', () => {
  let service: LocalItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
