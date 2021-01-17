import { TestBed } from '@angular/core/testing';

import { ValidadorFormService } from './validador-form.service';

describe('ValidadorFormService', () => {
  let service: ValidadorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
