import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PainelComponent } from '../painel/painel.component';
import { AuthGuardService } from '../login/shared/service/auth-guard.service';

const homeRoutes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PainelComponent },
      { path: 'painel', loadComponent: () => import('../painel/painel.component').then(mod => mod.PainelComponent), canActivate: [AuthGuardService] },
      { path: 'estrutura', loadComponent: () => import('../estrutura-orcamento/estrutura-orcamento.component').then(mod => mod.EstruturaOrcamentoComponent), canActivate: [AuthGuardService] },
      { path: 'cadastro-estrutura', loadComponent: () => import('../cadastra-estrutura/cadastra-estrutura.component').then(mod => mod.CadastraEstruturaComponent), canActivate: [AuthGuardService] },
      { path: 'precos', loadComponent: () => import('../atualizacao-precos/atualizacao-precos.component').then(mod => mod.AtualizacaoPrecosComponent), canActivate: [AuthGuardService] },
      { path: 'parametros', loadComponent: () => import('../parametros-estrutura/parametros-estrutura.component').then(mod => mod.ParametrosEstruturaComponent), canActivate: [AuthGuardService] },
      { path: 'cadastra-parametros', loadComponent: () => import('../cadastra-parametros/cadastra-parametros.component').then(mod => mod.CadastraParametrosComponent), canActivate: [AuthGuardService] },
      { path: 'solicitar', loadComponent: () => import('../solicitacoes/solicitacoes.component').then(mod => mod.SolicitacoesComponent), canActivate: [AuthGuardService] },
      { path: 'formacao', loadComponent: () => import('../lista-orcamentos/lista-orcamentos.component').then(mod => mod.ListaOrcamentosComponent), canActivate: [AuthGuardService] } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
