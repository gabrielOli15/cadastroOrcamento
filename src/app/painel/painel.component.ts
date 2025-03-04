import { Component, ViewChild } from '@angular/core';
import { PainelService } from "./shared/Service/painel.service"; 
import { PoChartOptions, PoChartSerie, PoChartType, PoDialogService, 
  PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn, 
  PoTableComponent, PoTreeViewItem, SharedModule, PoBreadcrumb } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
    imports: [SharedModule],
    standalone: true,
    selector: 'app-painel',
    templateUrl: './painel.component.html',
    styleUrl: './painel.component.css'
})
export class PainelComponent { 
  readonly itemsTree: Array<PoTreeViewItem> = [
    {
      label: 'my_project',
      value: 1,
      expanded: true,
      subItems: [
        { label: 'angular.json', value: 121 },
        {
          label: 'browserslist',
          value: 122,
          subItems: [
            {
              label: 'e2e',
              value: 1223,
              subItems: [
                { label: 'protractor.conf.js', value: 12231 },
                { label: 'src', value: 12232 },
                { label: 'tsconfig.json', value: 12233 }
              ]
            }
          ]
        },
        { label: 'karma.conf.js', value: 123 },
        { label: 'node_modules', value: 124 },
        { label: 'package.json', value: 125 },
        { label: 'package-lock.json', value: 126 },
        { label: 'README.md', value: 127 },
        {
          label: 'src',
          value: 128,
          subItems: [
            { label: 'app', value: 1281 },
            { label: 'assets', value: 1282 },
            { label: 'environments', value: 1283 },
            { label: 'favicon.ico', value: 1284 },
            { label: 'index.html', value: 1285 },
            { label: 'main.ts', value: 1286 },
            { label: 'polyfills.ts', value: 1287 },
            { label: 'styles.css', value: 1288 },
            { label: 'test.ts', value: 1289 }
          ]
        },
        { label: 'tsconfig.app.json', value: 129 },
        { label: 'tsconfig.json', value: 130 },
        { label: 'tsconfig.spec.json', value: 131 },
        { label: 'eslint.json', value: 132 }
      ]
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Orçamentos', action: () => this.router.navigate(['/']) }, { label: 'Painel' }]
  }; 

  constructor(
    private poAlert: PoDialogService,
    private painelService: PainelService, 
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
    
  ) {}

  chartType: PoChartType = PoChartType.Donut;
  participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;

  chartInadimplentes: Array<PoChartSerie> = [
    { label: 'Projeto 1', data: 6, tooltip: 'Projeto 1', color: 'color-01' },
    { label: 'Projeto 2', data: 4, tooltip: 'Projeto 2', color: 'color-02' },
    { label: 'Projeto 3', data: 2, tooltip: 'Projeto 3', color: 'color-03' },
    { label: 'Projeto 4', data: 1, tooltip: 'Projeto 4', color: 'color-04' },
    { label: 'Projeto 5', data: 3, tooltip: 'Projeto 5', color: 'color-05' },
    { label: 'Projeto 6', data: 1, tooltip: 'Projeto 6', color: 'color-06' },
    { label: 'Projeto 7', data: 1, tooltip: 'Projeto 7', color: 'color-07' } 
  ];

  categories: Array<string> = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL'];

  participationByCountryInWorldExports: Array<PoChartSerie> = [
    { label: 'Projeto 1', data: [1, 1, 0, 0, 3, 0, 1], color: 'color-01' },
    { label: 'Projeto 2', data: [1, 0, 0, 0, 3, 0, 0], color: 'color-02' },
    { label: 'Projeto 3', data: [1, 0, 0, 0, 0, 0, 1], color: 'color-03' },
    { label: 'Projeto 4', data: [0, 0, 0, 0, 0, 0, 1], color: 'color-04' },
    { label: 'Projeto 5', data: [0, 0, 2, 0, 0, 0, 1], color: 'color-05' },
    { label: 'Projeto 6', data: [0, 0, 0, 0, 0, 1, 0], color: 'color-06' },
    { label: 'Projeto 7', data: [0, 0, 0, 1, 0, 0, 0], color: 'color-07' }
  ];

  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 10,
      gridLines: 5
    }
  };

  showMeTheDates(event: any) {
    this.poAlert.alert({
      title: event.label,
      message: `Total de ${event.data} títulos com ${event.label} de vencimento!`,
      ok: () => {}
    });
  } 


  // table 
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  actions: Array<PoTableAction> = [
    { action: this.details.bind(this), icon: 'po-icon-eye', label: 'Visualizar' },
    { action: this.details.bind(this), icon: 'po-icon-edit', label: 'Editar (versionar)' },
    { action: this.details.bind(this), icon: 'po-icon-doc-xls', label: 'Exportar excel pendentes' },
    { action: this.details.bind(this), icon: 'po-icon-export', label: 'Exportar projeto' },
    { action: this.email.bind(this), icon: 'po-icon-mail', label: 'Enviar excel por e-mail' },
  ];
  columns: Array<PoTableColumn> = [];
  columnsDefault: Array<PoTableColumn> = [];
  detail: any;
  items: Array<any> = [];
  total: number = 0;
  totalExpanded: number = 0;
  initialColumns: Array<any> = [];
 

  ngOnInit(): void {
    this.columns = this.painelService.getColumns();
    this.items = this.painelService.getItems();
  }
 
  registro() {
    this.poAlert.alert({
      title: 'Registro de contato',
      message: `Campos para registro de contato`,
      ok: () => {}
    });
  }

  email() {
    this.poAlert.alert({
      title: 'Envio de e-mail',
      message: `Reenvia e-mail para contatos`,
      ok: () => {}
    });
  }

  confirmItems(selectedItems: Array<any>) {
    selectedItems.forEach(item => {
      switch (item.status) {
        case 'available':
          this.poNotification.success(`${this.getDescription(item)} added succesfully`);
          break;
        case 'reserved':
          this.poNotification.warning(
            `${this.getDescription(item)} added succesfully, verify your e-mail to complete reservation`
          );
          break;
        case 'closed':
          this.poNotification.error(`${this.getDescription(item)} is closed and not available anymore`);
          break;
      }
    });

    this.poTable.unselectRows();
  }

  collapseAll() {
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onCollapseDetail();
        this.poTable.collapse(index);
      }
    });
  }

  decreaseTotal(row: any) {
    if (row.value) {
      this.total -= row.value;
    }
  }

  deleteItems(items: Array<any>) {
    this.items = items;
  }

  details(item) {
    this.detail = item;
    this.poModal.open();
  }

  remove(item: { [key: string]: any }) {
    this.poTable.removeItem(item);
  }

  discount(item) {
    if (!item.disableDiscount) {
      const updatedItem = { ...item, value: item.value - item.value * 0.2, disableDiscount: true };
      this.poTable.updateItem(item, updatedItem);
    }
  }

  expandAll() {
    this.totalExpanded = 0;
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onExpandDetail();
        this.poTable.expand(index);
      }
    });
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }

  sumTotal(row: any) {
    if (row.value) {
      this.total += row.value;
    }
  }

  restoreColumn() {
    this.columns = this.columnsDefault;
  }

  changeColumnVisible(event) {
    localStorage.setItem('initial-columns', event);
  }

  private getDescription(item: any) {
    return `Airfare to ${item.destination} - ${item.initials}`;
  }

  private validateDiscount(item) {
    return item.disableDiscount;
  }

}
