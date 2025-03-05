import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoDynamicViewField, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoTableColumnSpacing, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { ParametrosEstruturaService } from './shared/service/parametros-estrutura.service';


@Component({
  selector: 'app-parametros-estrutura',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './parametros-estrutura.component.html',
  styleUrl: './parametros-estrutura.component.css'
})
export class ParametrosEstruturaComponent {
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  readonly serviceApi = 'http://192.168.2.235:7200/rest/cardallapis/ZX2'; 
  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    new: '/orcamentos/cadastro-parametros',
    remove: true,
    removeAll: true
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Orçamentos', action: () => this.router.navigate(['/']) }, { label: 'Parâmetros' }]
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

  // "zx2_cod": "MOD1104",
  // "zx2_tpprod": "K",
  // "zx2_vlprod": 7,
  // "zx2_kit": "4016570",
  // "zx2_var": "P",
  // "zx2_cmc": 0,
  // "zx2_cmt": 3.5,
  // "zx2_smc": 0,
  // "zx2_smt": 10,
  // "zx2_fmc": 1.5,
  // "zx2_fmt": 2.5

  fields: Array<PoPageDynamicTableFilters> = [
    { property: 'zx2_cod', label: 'Mão de Obra', key: true, filter: true },
    { property: 'zx2_tpprod', label: 'Tp. Prod.', filter: true, type: 'label',
      labels: [
        { value: 'K', label: 'Kg/h', color: 'color-01' },
      ]
    },
    { property: 'zx2_vlprod', label: 'Produtividade', filter: true},
    { property: 'zx2_kit', label: 'Kit Tinta', filter: true }, 
    { property: 'zx2_var', label: 'Variável', filter: true, type: 'label',
      labels: [
        { value: 'P', label: 'Peso', color: 'color-01' },
        { value: 'E', label: 'Externa', color: 'color-02' },
        { value: 'I', label: 'Interna', color: 'color-03' },
        { value: 'A', label: 'Ambas', color: 'color-04' },
        { value: '-', label: 'n/a', color: 'color-05' }
      ]
    }, 
    { property: 'zx2_cmc', label: '% Cons. MC', filter: true },
    { property: 'zx2_cmt', label: '% Cons. MT', filter: true },
    { property: 'zx2_smc', label: '% Sucata MC', filter: true },
    { property: 'zx2_smt', label: '% Sucata MT', filter: true },
    { property: 'zx2_fmc', label: '% Frete MC', filter: true },
    { property: 'zx2_fmt', label: '% Frete MT', filter: true }
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
    { label: 'Print', action: this.printPage.bind(this), icon: 'an an-printer' },
    {
      label: 'Download .csv',
      action: this.parametrosEstruturaService.downloadCsv.bind(this.parametrosEstruturaService, this.serviceApi),
      icon: 'an an-download-simple'
    }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Editar',
      url: '/cadastro-parametros/:id',
      icon: 'po-icon-edit'
    },
    {
      label: 'Estruturas',
      action: this.onClickEstruturas.bind(this),
      visible: this.possuiEstruturas.bind(this),
      icon: 'an an-tree-view'
    }
  ];

  constructor(
      private parametrosEstruturaService: ParametrosEstruturaService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // this.pageCustomActions = [
    //   ...this.pageCustomActions,
    //   {
    //     label: 'Download .csv',
    //     action: this.parametrosEstruturaService.downloadCsv.bind(this.parametrosEstruturaService, this.serviceApi),
    //     icon: 'an an-download-simple'
    //   }
    // ];
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

  possuiEstruturas(parametro: any) {
    return false //parametro.estruturas.length !== 0;
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

  private onClickEstruturas(parametro: any) {
    //this.estruturas = parametro.estruturas;

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
}
