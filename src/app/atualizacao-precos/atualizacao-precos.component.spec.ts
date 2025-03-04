import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizacaoPrecosComponent } from './atualizacao-precos.component';

describe('AtualizacaoPrecosComponent', () => {
  let component: AtualizacaoPrecosComponent;
  let fixture: ComponentFixture<AtualizacaoPrecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizacaoPrecosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizacaoPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
