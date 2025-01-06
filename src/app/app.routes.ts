import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './painel/painel.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'index.html', pathMatch: 'full' },
  { path: 'index.html', component: PainelComponent },
  { path: 'painel', loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule) },
  { path: 'cadastro', loadChildren: () => import('./cadastra-orcamento/cadastra-orcamento.module').then(m => m.CadastraOrcamentoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
