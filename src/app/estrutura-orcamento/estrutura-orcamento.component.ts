import { Component } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { EstruturaOrcamentoService } from './shared/service/estrutura-orcamento.service';
import { Estruturas } from './shared/interface/pedidos';

@Component({
    selector: 'app-estrutura-orcamento',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './estrutura-orcamento.component.html',
    styleUrl: './estrutura-orcamento.component.css'
})
export class EstruturaOrcamentoComponent {
  estruturas: Estruturas = {
    items: [],
    hasNext: false,
    remainingRecords: 0
  }
  estruturasColumns: Array<PoTableColumn> = [];
  quickSearchWidth: number = 6;
  hideRemoveAllDisclaimer = false;
  hideCloseDisclaimers: Array<string> = ['city'];
  tipoEstrutura: boolean = true;

  public readonly actions: Array<PoPageAction> = [
    { label: 'Nova Estrutura', action: this.novaEstrutura.bind(this), separator: true,  }, 
    { label: 'Alterar', action: this.handleEstrutura.bind(this,1), separator: true, disabled: this.validaSelecao.bind(this) }, 
    { label: 'Excluir', action: this.handleEstrutura.bind(this,2), separator: true, disabled: this.validaSelecao.bind(this)  }, 
    { label: 'Bloquear', action: this.handleEstrutura.bind(this,3), separator: true, disabled: this.validaSelecao.bind(this)  }, 
    { label: 'Desbloquear', action: this.handleEstrutura.bind(this,4), separator: true, disabled: this.validaSelecao.bind(this)  }, 
    { label: 'Copiar', action: this.handleEstrutura.bind(this,5), separator: true, disabled: this.validaSelecao.bind(this)  }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Orçamentos', action: this.beforeRedirect.bind(this) }, { label: 'Estruturas' }]
  };

  readonly literals: PoPageDynamicSearchLiterals = {
    filterConfirmLabel: 'Aplicar',
    filterTitle: 'Filtro avançado',
    quickSearchLabel: 'Valor pesquisado:'
  };

  private jobDescriptionOptions: Array<PoSelectOption> = [];
  private statusOptions: Array<PoSelectOption> = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', options: this.statusOptions, gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', options: this.jobDescriptionOptions, gridColumns: 6 }
  ];

  constructor(
    private estruturaOrcamentoService: EstruturaOrcamentoService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  // funções 
  private validaSelecao() {  
    return !this.estruturas.items.find(function(estrutura) { 
      return estrutura.$selected
    })
  }

  handleEstrutura(acao: number){
    let mensagem = '';
    switch(acao){
      case 1:
        mensagem = 'Alteração de estrutura';
        break;
      case 2:
        mensagem = 'Exclusão de estrutura';
        break;
      case 3:
        mensagem = 'Bloquear estrutura';
        break;
      case 4:
        mensagem = 'Desbloquear estrutura';
        break;
      case 5:
        mensagem = 'Copiar estrutura';
        break;
    }

    const poNotification: PoNotification = {
              message: mensagem,
              orientation: undefined,
              action: undefined,
              actionLabel: '',
              duration: 1000
            };
            this.poNotification.error(poNotification);
  }

  // legado
  ngOnInit() {
    this.estruturas.items = this.estruturaOrcamentoService.getItems().map(item => ({
      ...item,
      data: new Date(item.data)
    }));
    this.estruturasColumns = this.estruturaOrcamentoService.getColumns();
    this.jobDescriptionOptions = this.estruturaOrcamentoService.getJobs();
    this.statusOptions = this.estruturaOrcamentoService.getHireStatus();

    this.updateFilters();
  }

  onAdvancedSearch(filter) {
    filter ? this.searchItems(filter) : this.resetFilters();
  }

  onChangeDisclaimers(disclaimers) {
    const filter = {};
    disclaimers.forEach(item => {
      filter[item.property] = item.value;
    });
    this.searchItems(filter);
  }

  onQuickSearch(filter) {
    filter ? this.searchItems({ name: filter }) : this.resetFilters();
  }

  onLoadFields() {
    return this.estruturaOrcamentoService.getPageOptions();
  }

  private beforeRedirect(itemBreadcrumbLabel) {
    if (this.estruturas.items.some(candidate => candidate['$selected'])) {
      this.poDialog.confirm({
        title: `Confirm redirect to ${itemBreadcrumbLabel}`,
        message: `There is data selected. Are you sure you want to quit?`,
        confirm: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  private novaEstrutura() {
    this.router.navigate(['/orcamentos/cadastro-estrutura']);
  }

  private resetFilters() {
    //this.estruturas = this.estruturaOrcamentoService.resetFilterHiringProcess();
  }

  private searchItems(filter) {
    //this.estruturas = this.estruturaOrcamentoService.filter(filter);
  }

  private updateFilters() {
    this.filters[0].options = this.statusOptions;
    this.filters[3].options = this.jobDescriptionOptions;
  }

  private onClickRemoveAllDisclaimer() {
    this.hideRemoveAllDisclaimer = !this.hideRemoveAllDisclaimer;
  }

  private isVisibleRemoveAllDisclaimer() {
    return !this.hideRemoveAllDisclaimer;
  }

  private isHideRemoveAllDisclaimer() {
    return this.hideRemoveAllDisclaimer;
  }

  private onClickCloseCityDisclaimer() {
    if (this.hideCloseDisclaimers.length > 0) {
      this.hideCloseDisclaimers = [];
    } else {
      this.hideCloseDisclaimers = ['city'];
    }
  }

  private isVisibleCloseCityDisclaimer() {
    return this.hideCloseDisclaimers.length <= 0;
  }

  private isHideCloseCityDisclaimer() {
    return this.hideCloseDisclaimers.length > 0;
  }
}
