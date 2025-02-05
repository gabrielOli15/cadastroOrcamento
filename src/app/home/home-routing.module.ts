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
      { path: 'solicitar', loadComponent: () => import('../solicita-orcamento/solicita-orcamento.component').then(mod => mod.SolicitaOrcamentoComponent), canActivate: [AuthGuardService] },
      { path: 'cadastro', loadComponent: () => import('../cadastra-orcamento/cadastra-orcamento.component').then(mod => mod.CadastraOrcamentoComponent), canActivate: [AuthGuardService] } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
