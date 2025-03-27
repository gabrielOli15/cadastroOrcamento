import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoDynamicViewField, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoTableColumnSpacing, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions, PoPageDynamicTableFilters, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { ParametrosEstruturaService } from './shared/service/parametros-estrutura.service';
import { api } from '../model/api';

const apiData: api = new api();

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
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  readonly serviceApi = apiData.URL + '/cardallapis/ZX2/ZX2_COD?pagesize=50'; 
  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    new: '/orcamentos/cadastro-parametros'
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
    { property: 'zx2_cod', label: 'Código', key: true, filter: true }, 
    { property: 'zx2_desc', label: 'Descrição', key: true, filter: true }, 
    { property: 'zx2_mod', label: 'Mão de Obra', filter: true }, 
    { property: 'zx2_tpprod', label: 'Tp. Produtividade', filter: true, type: 'label',
      labels: [
        { value: 'K', label: 'KG/H', color: 'color-01' },
        { value: 'H', label: 'Horas', color: 'color-02' }
      ]
    },
    { property: 'zx2_vlprod', label: 'Produtividade', filter: true},
    { property: 'zx2_kit', label: 'Kit Tinta', filter: true }, 
    { property: 'zx2_var', label: 'Variável', filter: true, type: 'label',
      labels: [
        { value: 'P', label: 'Peso', color: 'color-01' },
        { value: 'E', label: 'Externa', color: 'color-02' },
        { value: 'I', label: 'Interna', color: 'color-03' },
        { value: '', label: 'Não possui', color: 'color-05' }
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
    // { label: 'Print', action: this.printPage.bind(this), icon: 'an an-printer' },
    // {
    //   label: 'Download .csv',
    //   action: this.parametrosEstruturaService.downloadCsv.bind(this.parametrosEstruturaService, this.serviceApi),
    //   icon: 'an an-download-simple'
    // }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Editar',
      action: this.editarParametro.bind(this),
      icon: 'po-icon-edit'
    },
    {
      label: 'Excluir',
      action: this.deletarParametro.bind(this),
      icon: 'po-icon-delete'
    }
  ];

  constructor(
      private parametrosEstruturaService: ParametrosEstruturaService,
      private router: Router,
      private poDialog: PoDialogService,
      private poNotification: PoNotificationService
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

  private editarParametro(parametro: any) {
    console.log(parametro)
    //this.router.navigate(['/orcamentos/cadastro-parametros', parametro]);
    this.router.navigate(['/orcamentos/cadastro-parametros'], 
      { queryParams: { parametro: JSON.stringify(parametro) }});
  }

  private deletarParametro(parametro: any) {
    this.poDialog.confirm({
      title: 'Excluir',
      message: 'Deseja realmente excluir o parâmetro?',
      confirm: () => {
        this.parametrosEstruturaService.deleteParametro(parametro).subscribe(
          response => {
            console.log('parâmetro deletado', response);
    
            this.poNotification.success('Parâmetro excluído com sucesso'); 
            this.dynamicTable.updateDataTable({page: 1, pagesize: 1000});
          },
          error => {
            console.error('Erro ao excluir registro', error);
          }
        );
      },
      cancel: () => console.log('Cancelado')
    }); 
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
