import { TestBed } from '@angular/core/testing';

import { ListaOrcamentosService } from './lista-orcamentos.service';

describe('ListaOrcamentosService', () => {
  let service: ListaOrcamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaOrcamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
