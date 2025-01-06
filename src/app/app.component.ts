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
    { label: 'painel', action: () => this.router.navigate(['painel']), icon: 'po-icon-news', shortLabel: 'Painel' },
    { label: 'Cadastro', action: () => this.router.navigate(['cadastro']), icon: 'po-icon-manufacture', shortLabel: 'Cadastro' },
    { label: 'Sair', action: () => this.closeApp(), icon: 'po-icon-exit', shortLabel: 'Sair' }
  ];

  closeApp(): void {
    this.proAppConfigService.callAppClose(false);
  }
}
