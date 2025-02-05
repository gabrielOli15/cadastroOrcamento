import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraEstruturaComponent } from './cadastra-estrutura.component';

describe('CadastraEstruturaComponent', () => {
  let component: CadastraEstruturaComponent;
  let fixture: ComponentFixture<CadastraEstruturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraEstruturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastraEstruturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
