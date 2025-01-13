import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstruturaOrcamentoComponent } from './estrutura-orcamento.component';

describe('EstruturaOrcamentoComponent', () => {
  let component: EstruturaOrcamentoComponent;
  let fixture: ComponentFixture<EstruturaOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstruturaOrcamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstruturaOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
