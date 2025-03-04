import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoDynamicViewField, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoTableColumnSpacing, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions } from '@po-ui/ng-templates';
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
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
    @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;
  
    readonly serviceApi = 'https://po-sample-api.onrender.com/v1/people'; 
    actionsRight = false;
    detailedUser: any;
    dependents: any;
    quickSearchWidth: number = 3;
    fixedFilter = false;
  
    public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Orçamentos', action: () => this.router.navigate(['/']) }, { label: 'Estruturas' }]
    };
  
    readonly tableSpacing: PoTableColumnSpacing = PoTableColumnSpacing.Small;
  
    readonly cityOptions: Array<object> = [
      { value: 'São Paulo', label: 'São Paulo' },
      { value: 'Joinville', label: 'Joinville' },
      { value: 'São Bento', label: 'São Bento' },
      { value: 'Araquari', label: 'Araquari' },
      { value: 'Campinas', label: 'Campinas' },
      { value: 'Osasco', label: 'Osasco' }
    ];
  
    fields: Array<any> = [
      { property: 'id', key: true, visible: false, filter: true },
      { property: 'name', label: 'Name', filter: true, gridColumns: 6 },
      { property: 'genre', label: 'Genre', filter: true, gridColumns: 6, duplicate: true, sortable: false },
      { property: 'search', filter: true, visible: false },
      {
        property: 'birthdate',
        label: 'Birthdate',
        type: 'date',
        gridColumns: 6,
        visible: false,
        allowColumnsManager: true
      },
      { property: 'city', label: 'City', filter: true, duplicate: true, options: this.cityOptions, gridColumns: 12 }
    ];
  
    readonly detailFields: Array<PoDynamicViewField> = [
      { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
      { property: 'name', gridLgColumns: 4 },
      { property: 'nickname', label: 'User name', gridLgColumns: 4 },
      { property: 'email', gridLgColumns: 4 },
      { property: 'birthdate', gridLgColumns: 4, type: 'date' },
      { property: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
      { property: 'cityName', label: 'City', divider: 'Address' },
      { property: 'state' },
      { property: 'country' }
    ];
  
    pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
      { label: 'Nova Estrutura', action: this.novaEstrutura.bind(this),   }, 
      { label: 'Alterar', action: this.handleEstrutura.bind(this,1), visible: this.validaSelecao.bind(this) }, 
      { label: 'Excluir', action: this.handleEstrutura.bind(this,2), visible: this.validaSelecao.bind(this)  }, 
      { label: 'Bloquear', action: this.handleEstrutura.bind(this,3), visible: this.validaSelecao.bind(this)  }, 
      { label: 'Desbloquear', action: this.handleEstrutura.bind(this,4), visible: this.validaSelecao.bind(this)  }, 
      { label: 'Copiar', action: this.handleEstrutura.bind(this,5), visible: this.validaSelecao.bind(this)  }
    ];
  
    tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
      {
        label: 'Details',
        action: this.onClickUserDetail.bind(this),
        disabled: this.isUserInactive.bind(this),
        icon: 'an an-user'
      },
      {
        label: 'Dependents',
        action: this.onClickDependents.bind(this),
        visible: this.hasDependents.bind(this),
        icon: 'an an-user'
      }
    ];
  
    constructor(
        private estruturaOrcamentoService: EstruturaOrcamentoService,
        private router: Router,
        private poNotification: PoNotificationService
    ) {}
  
    ngOnInit(): void {
      this.pageCustomActions = [
        ...this.pageCustomActions,
        {
          label: 'Download .csv',
          action: this.estruturaOrcamentoService.downloadCsv.bind(this.estruturaOrcamentoService, this.serviceApi),
          icon: 'an an-download-simple'
        }
      ];
    }
  
    onLoad(): PoPageDynamicTableOptions {
      return {
        fields: [
          { property: 'id', key: true, visible: true, filter: true },
          { property: 'name', label: 'Name', filter: true, gridColumns: 6 },
          { property: 'genre', label: 'Genre', filter: true, gridColumns: 6, duplicate: true },
          { property: 'search', initValue: 'São Paulo' },
          {
            property: 'birthdate',
            label: 'Birthdate',
            type: 'date',
            gridColumns: 6,
            visible: false,
            allowColumnsManager: true
          }
        ]
      };
    }
  
    isUserInactive(person: any) {
      return person.status === 'inactive';
    }
  
    hasDependents(person: any) {
      return person.dependents.length !== 0;
    }
  
    printPage() {
      window.print();
    }
  
    private onClickUserDetail(user: any) {
      this.detailedUser = user;
  
      this.userDetailModal.open();
    }
  
    private onClickDependents(user: any) {
      this.dependents = user.dependents;
  
      this.dependentsModal.open();
    }
  
    onEdit($event: Event) {
      console.log('onEdit');
    }
      onView($event: Event) {
      console.log('onView');
    }
      onDelete($event: Event) {
      console.log('onDelete');
    }
      onDuplicate($event: Event) {
      console.log('onDuplicate');
    }
      onSelect($event: Event) {
      console.log('onSelect');
    }
      onDeselect($event: Event) {
      console.log('onDeselect');
    }
      onLoadMore($event: Event) {
      console.log('onLoadMore');
    }
      onRowClick($event: Event) {
      console.log('onRowClick');
    }
      onRowDoubleClick($event: Event) {
      console.log('onRowDoubleClick');
    }
      onRowSelection($event: Event) {
      console.log('onRowSelection');
    }
      onRowDeselection($event: Event) {
      console.log('onRowDeselection');
    }

  estruturas: Estruturas = {
    items: [],
    hasNext: false,
    remainingRecords: 0
  }
  estruturasColumns: Array<PoTableColumn> = [];
  hideRemoveAllDisclaimer = false;
  hideCloseDisclaimers: Array<string> = ['city'];
  tipoEstrutura: boolean = true;

 

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
