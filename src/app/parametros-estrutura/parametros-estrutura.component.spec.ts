import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosEstruturaComponent } from './parametros-estrutura.component';

describe('ParametrosEstruturaComponent', () => {
  let component: ParametrosEstruturaComponent;
  let fixture: ComponentFixture<ParametrosEstruturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrosEstruturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosEstruturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
