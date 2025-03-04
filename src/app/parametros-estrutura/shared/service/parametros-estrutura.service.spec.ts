import { TestBed } from '@angular/core/testing';

import { ParametrosEstruturaService } from './parametros-estrutura.service';

describe('ParametrosEstruturaService', () => {
  let service: ParametrosEstruturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrosEstruturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
