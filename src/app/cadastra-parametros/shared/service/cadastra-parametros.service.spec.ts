import { TestBed } from '@angular/core/testing';

import { CadastraParametrosService } from './cadastra-parametros.service';

describe('CadastraParametrosService', () => {
  let service: CadastraParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastraParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
