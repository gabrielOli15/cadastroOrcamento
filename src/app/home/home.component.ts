import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoNavbarIconAction, PoThemeModule } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoNavbarLiterals } from '@po-ui/ng-components/lib/components/po-navbar/interfaces/po-navbar-literals.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false
})
export class HomeComponent {
  
  hideRememberUser: boolean = true;    

  constructor (
    private router: Router,
    private storage: PoStorageService,
  ) {
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Painel', link: './painel', icon: 'an an-ranking', shortLabel: 'Painel' }, // , action: () => this.router.navigate(['painel'])
    { label: 'Atualização de Preços', link: './precos', icon: 'an an-money', shortLabel: 'Preços' }, // action: () => this.router.navigate(['estrutura']), 
    { label: 'Parâmetros de orçamentos', link: './parametros', icon: 'an an-network', shortLabel: 'Parâmetros' }, // action: () => this.router.navigate(['estrutura']), 
    { label: 'Estruturas de orçamentos', link: './estrutura', icon: 'an an-tree-view', shortLabel: 'Estruturas' }, // action: () => this.router.navigate(['estrutura']), 
    { label: 'Formação de orçamento', link: './formacao', icon: 'an an-layout', shortLabel: 'Orçamentos' }, // , action: () => this.router.navigate(['cadastro'])
    { label: 'Solicitar orçamento', link: './solicitar', icon: 'an an-receipt', shortLabel: 'Solicitar' }, // , action: () => this.router.navigate(['solicitar'])
    { label: 'Sair', action: () => this.closeApp(), icon: 'an an-sign-out', shortLabel: 'Sair' }
  ]; 
  
  closeApp(): void {
    this.storage.remove('loggedIn').then(() => {
      this.router.navigate(['/login']);
    });
  }

}
