import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module'; 
import { CadastraOrcamentoRoutingModule } from './cadastra-orcamento-routing.module';
import { CadastraOrcamentoComponent } from './cadastra-orcamento.component';

@NgModule({
  declarations: [
    CadastraOrcamentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CadastraOrcamentoRoutingModule
  ]
})
export class CadastraOrcamentoModule { }
