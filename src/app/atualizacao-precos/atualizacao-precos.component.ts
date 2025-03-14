import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoDynamicViewField, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoTableColumnSpacing, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { AtualizacaoPrecosService } from './shared/service/atualizacao-precos.service';
import { api } from '../model/api';

const apiData: api = new api();

@Component({
  selector: 'app-atualizacao-precos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './atualizacao-precos.component.html',
  styleUrl: './atualizacao-precos.component.css'
})
export class AtualizacaoPrecosComponent {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  readonly serviceApi = apiData.URL + '/cardallapis/SB1'; 
  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  readonly actions: PoPageDynamicTableActions = {
    remove: true,
    removeAll: true
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Orçamentos', action: () => this.router.navigate(['/']) }, { label: 'Preços' }]
  };

  readonly tableSpacing: PoTableColumnSpacing = PoTableColumnSpacing.Small;

  fields: Array<any> = [
    { property: 'b1_grupo', label: 'Grupo', key: true, visible: true, filter: true },
    { property: 'b1_cod', label: 'Cod', key: true, visible: true, filter: true },
    { property: 'b1_desc', label: 'Descrição', filter: true },
    { property: 'b1_custd', label: 'Valor', filter: true, gridColumns: 6, duplicate: true, sortable: false } 
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    {property: 'b1_grupo', label: ''},
    {property: 'b1_cod', label: ''},
    {property: 'b1_desc', label: ''},
    {property: 'b1_tipo', label: ''},
    {property: 'b1_subgrup', label: ''},
    {property: 'b1_um', label: ''},
    {property: 'b1_locpad', label: ''},
    {property: 'b1_pesopad', label: ''},
    {property: 'b1_picm', label: ''},
    {property: 'b1_ipi', label: ''},
    {property: 'b1_posipi', label: ''},
    {property: 'b1_especie', label: ''},
    {property: 'b1_ex_ncm', label: ''},
    {property: 'b1_ex_nbm', label: ''},
    {property: 'b1_endcar', label: ''},
    {property: 'b1_aliqiss', label: ''},
    {property: 'b1_codiss', label: ''},
    {property: 'b1_te', label: ''},
    {property: 'b1_ts', label: ''},
    {property: 'b1_picmret', label: ''},
    {property: 'b1_picment', label: ''}, 
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'PDF', action: this.printPage.bind(this), icon: 'an an-printer' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Detalhes',
      action: this.onClickUserDetail.bind(this),
      disabled: false, //this.isUserInactive.bind(this)
      icon: 'an an-subtitles'
    },
    {
      label: 'Corrigir valor',
      action: this.onClickUserDetail.bind(this),
      disabled: false,
      icon: 'an an-pencil-simple'
    }
  ];

  constructor(
      private atualizacaoPrecosService: AtualizacaoPrecosService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.pageCustomActions = [
      ...this.pageCustomActions,
      {
        label: 'CSV',
        action: this.atualizacaoPrecosService.downloadCsv.bind(this.atualizacaoPrecosService, this.serviceApi),
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
}
