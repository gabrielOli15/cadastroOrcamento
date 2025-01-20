import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoNavbarIconAction, PoThemeModule } from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoNavbarLiterals } from '@po-ui/ng-components/lib/components/po-navbar/interfaces/po-navbar-literals.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  hideRememberUser: boolean = true;    

  constructor (
    private router: Router,
    private storage: PoStorageService,
    private proAppConfigService: ProAppConfigService
  ) {
    this.proAppConfigService.loadAppConfig();
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Painel', link: './painel', icon: 'ph ph-ranking', shortLabel: 'Painel' }, // , action: () => this.router.navigate(['painel'])
    { label: 'Estrutura de orçamentos', link: './estrutura', icon: 'ph ph-tree-view', shortLabel: 'Estruturas' }, // action: () => this.router.navigate(['estrutura']), 
    { label: 'Solicitar orçamento', link: './solicitar', icon: 'ph ph-receipt', shortLabel: 'Solicitar' }, // , action: () => this.router.navigate(['solicitar'])
    { label: 'Formação de orçamento', link: './cadastro', icon: 'ph ph-layout', shortLabel: 'Orçamentos' }, // , action: () => this.router.navigate(['cadastro'])
    { label: 'Sair', action: () => this.closeApp(), icon: 'ph ph-sign-out', shortLabel: 'Sair' }
  ]; 
  
  closeApp(): void {
    //this.proAppConfigService.callAppClose(false);
    this.storage.remove('loggedIn').then(() => {
      this.router.navigate(['/login']);
    });
  }

}
