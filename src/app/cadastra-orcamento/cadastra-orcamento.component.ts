import { Component, ViewChild } from '@angular/core';
import { CadastraOrcamentoService } from './shared/Service/cadastra-orcamento.service';
import { PoChartOptions, PoChartSerie, PoChartType, PoDialogService, PoModalComponent, 
  PoNotificationService, PoStepperComponent, PoTableAction, PoTableColumn, 
  PoTableComponent, PoTreeViewItem, SharedModule } 
  from '../shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-cadastra-orcamento',
  templateUrl: './cadastra-orcamento.component.html',
  styleUrl: './cadastra-orcamento.component.css'
})
export class CadastraOrcamentoComponent {
  @ViewChild('stepper', { static: true }) stepper!: PoStepperComponent;
  // table 
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  columnsItemsSelected: Array<PoTableColumn> = [{ property: 'item', label: 'Item', },{ property: 'valor', label: 'Valor', type: 'currency'}];
  confirmed: boolean = false;
  itemsListSelected: Array<any> = [
    {
      item: 'Valor produtos',
      valor: 8000,
    },
    {
      item: 'Valor mão de obra',
      valor: 5000,
    },
    {
      item: 'Valor tintas',
      valor: 3000,
    },
    {
      item: 'Valor Total',
      valor: 16000,
    }
  ];

  readonly itemsTree: Array<PoTreeViewItem> = [
    {
      label: 'Projeto 8',
      value: 'condiments',
      subItems: [
        { label: 'Produto 1', value: 'extraVirginOlive',
          subItems: [
            { label: 'Produto 5', value: 'extraVirginOlive' },
            { label: 'Produto 6', value: 'Mayonnaise' },
            { label: 'Produto 7', value: 'tomatoKetchup' }
        ]
        },
        { label: 'Produto 2', value: 'Mayonnaise' },
        { label: 'Produto 3', value: 'tomatoKetchup' },
        { label: 'Produto 4', value: 'soda' }
      ]
    }
  ];

  addItem(seletectedItem) {
    if (seletectedItem.subItems) {
      seletectedItem.subItems.forEach(itemSelected => {
        if (!this.itemsListSelected.some(item => item.item === itemSelected.label)) {
          this.itemsListSelected.push({ item: itemSelected.label });
        }
      });
    } else {
      if (!this.itemsListSelected.some(item => item.item === seletectedItem.label)) {
        this.itemsListSelected.push({ item: seletectedItem.label });
      }
    }
  }

  checkOut() {
    this.confirmed = true;
    this.stepper.next();
  }

  isConfirmed() {
    return !!this.confirmed;
  }

  removeItem(unseletectedItem) {
    if (unseletectedItem.subItems) {
      const removedValues = unseletectedItem.subItems.map(item => item.label);
      this.itemsListSelected = this.itemsListSelected.filter(
        itemSelected => !removedValues.includes(itemSelected.item)
      );
    } else {
      this.itemsListSelected = this.itemsListSelected.filter(
        itemSelected => unseletectedItem.label !== itemSelected.item
      );
    }
  }

  constructor(
    private poAlert: PoDialogService,
    private cadastraOrcamentoService: CadastraOrcamentoService, 
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService
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
    this.columns = this.cadastraOrcamentoService.getColumns();
    this.items = this.cadastraOrcamentoService.getItems();
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
