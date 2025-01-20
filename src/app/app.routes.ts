import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './login/shared/service/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/orcamentos', pathMatch: 'full' },
  { path: 'orcamentos', canActivate: [AuthGuardService], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent) },
  { path: '**', redirectTo: '/orcamentos', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
