import { TestBed } from '@angular/core/testing';

import { CadastraOrcamentoService } from './cadastra-orcamento.service';

describe('CadastraOrcamentoService', () => {
  let service: CadastraOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastraOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
