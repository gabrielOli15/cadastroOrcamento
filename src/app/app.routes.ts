import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './painel/painel.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'index.html', pathMatch: 'full' },
  { path: 'index.html', component: PainelComponent },
  { path: 'painel', loadComponent: () => import('./painel/painel.component').then(mod => mod.PainelComponent) },
  { path: 'estrutura', loadComponent: () => import('./estrutura-orcamento/estrutura-orcamento.component').then(mod => mod.EstruturaOrcamentoComponent) },
  { path: 'solicitar', loadComponent: () => import('./solicita-orcamento/solicita-orcamento.component').then(mod => mod.SolicitaOrcamentoComponent) },
  { path: 'cadastro', loadComponent: () => import('./cadastra-orcamento/cadastra-orcamento.component').then(mod => mod.CadastraOrcamentoComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
