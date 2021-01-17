import { TestBed } from '@angular/core/testing';

import { GuardaService } from './guarda.service';

describe('GuardaService', () => {
  let service: GuardaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
