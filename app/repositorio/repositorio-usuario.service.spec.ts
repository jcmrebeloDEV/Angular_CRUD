import { TestBed } from '@angular/core/testing';

import { RepositorioUsuarioService } from './repositorio-usuario.service';

describe('RepositorioUsuarioService', () => {
  let service: RepositorioUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositorioUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
