import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastraOrcamentoComponent } from './cadastra-orcamento.component';

const routes: Routes = [
  { path: '', component: CadastraOrcamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastraOrcamentoRoutingModule { }
