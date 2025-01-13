import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  constructor (
    private router: Router,
    private proAppConfigService: ProAppConfigService
  ) {
    this.proAppConfigService.loadAppConfig();
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'login', action: () => this.router.navigate(['login']), icon: 'ph ph-person', shortLabel: 'Login' },
    { label: 'Estrutura de orçamentos', action: () => this.router.navigate(['estrutura']), icon: 'ph ph-stack', shortLabel: 'Estrutura' },
    { label: 'painel', action: () => this.router.navigate(['painel']), icon: 'ph ph-ranking', shortLabel: 'Painel' },
    { label: 'Solicitar', action: () => this.router.navigate(['solicitar']), icon: 'po-icon-news', shortLabel: 'Solicitar' },
    { label: 'Orçamentos', action: () => this.router.navigate(['cadastro']), icon: 'po-icon-manufacture', shortLabel: 'Orçamentos' },
    { label: 'Sair', action: () => this.closeApp(), icon: 'po-icon-exit', shortLabel: 'Sair' }
  ];
  
  closeApp(): void {
    this.proAppConfigService.callAppClose(false);
  }
}
