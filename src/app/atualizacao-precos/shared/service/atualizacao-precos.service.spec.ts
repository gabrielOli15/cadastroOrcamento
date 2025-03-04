import { TestBed } from '@angular/core/testing';

import { AtualizacaoPrecosService } from './atualizacao-precos.service';

describe('AtualizacaoPrecosService', () => {
  let service: AtualizacaoPrecosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizacaoPrecosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
