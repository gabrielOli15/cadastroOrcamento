import { TestBed } from '@angular/core/testing';

import { CadastraEstruturaService } from './cadastra-estrutura.service';

describe('CadastraEstruturaService', () => {
  let service: CadastraEstruturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastraEstruturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
