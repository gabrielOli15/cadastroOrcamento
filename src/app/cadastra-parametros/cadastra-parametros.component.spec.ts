import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraParametrosComponent } from './cadastra-parametros.component';

describe('CadastraParametrosComponent', () => {
  let component: CadastraParametrosComponent;
  let fixture: ComponentFixture<CadastraParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraParametrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastraParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
