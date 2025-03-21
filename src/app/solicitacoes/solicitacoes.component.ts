import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoDynamicViewField, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoTableColumnSpacing, SharedModule } from '../shared/shared.module';
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { SolicitacoesService } from './shared/service/solicitacoes.service'; 

@Component({
  selector: 'app-solicitacoes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './solicitacoes.component.html',
  styleUrl: './solicitacoes.component.css'
})
export class SolicitacoesComponent {
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
    @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;
  
    readonly serviceApi = 'https://po-sample-api.onrender.com/v1/people'; 
    actionsRight = false;
    detailedUser: any;
    dependents: any;
    quickSearchWidth: number = 3;
    fixedFilter = false;
  
    readonly actions: PoPageDynamicTableActions = {
      new: '/orcamentos/solicita-orcamento',
      remove: true,
      removeAll: true
    };
  
    public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Orçamentos', action: () => this.router.navigate(['/']) }, { label: 'Solicitações' }]
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
      { property: 'city', label: 'Codigo', filter: true, duplicate: true, options: this.cityOptions, gridColumns: 12 },
      { property: 'name', label: 'Solicitante', filter: true, gridColumns: 6 }
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
      { label: 'Print', action: this.printPage.bind(this), icon: 'an an-printer' }
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
        private solicitacoesService: SolicitacoesService,
        private router: Router
    ) {}
  
    ngOnInit(): void {
      this.pageCustomActions = [
        ...this.pageCustomActions,
        {
          label: 'Download .csv',
          action: this.solicitacoesService.downloadCsv.bind(this.solicitacoesService, this.serviceApi),
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
