import { TestBed } from '@angular/core/testing';

import { SolicitaOrcamentoService } from './solicita-orcamento.service';

describe('SolicitaOrcamentoService', () => {
  let service: SolicitaOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitaOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
