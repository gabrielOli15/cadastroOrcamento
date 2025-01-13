import { TestBed } from '@angular/core/testing';

import { EstruturaOrcamentoService } from './estrutura-orcamento.service';

describe('EstruturaOrcamentoService', () => {
  let service: EstruturaOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstruturaOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
