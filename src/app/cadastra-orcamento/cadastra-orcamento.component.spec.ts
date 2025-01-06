import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraOrcamentoComponent } from './cadastra-orcamento.component';

describe('CadastraOrcamentoComponent', () => {
  let component: CadastraOrcamentoComponent;
  let fixture: ComponentFixture<CadastraOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraOrcamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastraOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
