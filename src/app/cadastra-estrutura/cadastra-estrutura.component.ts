import { Component, ViewChild } from '@angular/core';
import { CadastraEstruturaService } from './shared/service/cadastra-estrutura.service';
import { PoBreadcrumb, PoDialogService, PoModalComponent, PoMultiselectOption, 
  PoNotificationService, PoSelectOptionGroup, PoStepperComponent, PoTableAction, 
  PoTableColumn, PoTableComponent, PoTreeViewItem, SharedModule, PoStepComponent } 
  from '../shared/shared.module';
import { PoAccordionComponent, PoStepperModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastra-estrutura',
  standalone: true,
  imports: [ SharedModule, NgFor, NgIf],
  templateUrl: './cadastra-estrutura.component.html',
  styleUrl: './cadastra-estrutura.component.css'
})
export class CadastraEstruturaComponent {
    @ViewChild('stepper', { static: true }) stepper!: PoStepperComponent;
    @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
    @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
    @ViewChild('definicaoForm', { static: true }) definicaoForm!: NgForm;
    @ViewChild(PoAccordionComponent, { static: true }) accordion!: PoAccordionComponent;

    // breadcrumb do componente
    public readonly breadcrumb: PoBreadcrumb = {
      items: [
        { label: 'Orçamentos', action: this.beforeRedirect.bind(this,'orcamentos') }, 
        { label: 'Estruturas', action: this.beforeRedirect.bind(this,'orcamentos/estrutura') }, 
        { label: 'Cadastro' }
      ]
    };

    // Variáveis para o componente de estrutura
    produtosEstrutura: Array<any> = [];
    produtosEstruturaBkp: Array<any> = [];
    isLoadingPayment: boolean = false;
    confirmaEstrutura: boolean = false;
    nomeEstrutura: string = '';
    areaInterna: string = '';
    areaExterna: string = '';
    codigoEstrutura: string = '';
    statusEstrutura: boolean = true;
    tipoEstrutura: boolean = true;
    produtosTree: Array<any> = [Array<PoTreeViewItem>];
    itemsListSelected: Array<any> = [];

    tipoEquipamento: Array<PoSelectOptionGroup> = [
      {
      label: 'Tipos de Estrutura',
      options: [
        { value: 'livre', label: 'Estrutura Livre' },
        { value: 'Tipo1', label: 'Tipo 1' },
        { value: 'Tipo2', label: 'Tipo 2' },
        { value: 'Tipo3', label: 'Tipo 3' },
        { value: 'Tipo4', label: 'Tipo 4' }
      ]
      }
    ];

    // lista de funções do componente
    onChangeTipoEstrutura($event) {
      console.log($event);
    }

    isConfirmedEstrutura() {
      if (this.definicaoForm.valid) {
        this.confirmaEstrutura = true;
      } else {
        this.confirmaEstrutura = false;
      }
      return !!this.confirmaEstrutura;
    }

    adicionarEstrutura() {
      this.estruturas.push({ 
        index: this.estruturas.length, 
      });
      this.produtosTree.push(Array<PoTreeViewItem>);
    }

    removerEstrutura(index) {
      this.estruturas.splice(index, 1);
      this.produtosTree.splice(index, 1);
      this.produtosEstrutura = this.produtosEstrutura.filter(
        item => item.estrutura !== (index+1)
      );
      this.produtosEstruturaBkp = this.produtosEstrutura;
    }

    onChangeProduto($event, indexEstrutura) {
      
      // Define estrutura
      let treeViewItem: PoTreeViewItem
      let labelEst: number = indexEstrutura + 1;
      console.log(indexEstrutura)
      console.log(labelEst)

      const indexProduto = this.produtos.findIndex(
        (optionItem) => optionItem.value === $event
      );
 
      treeViewItem = {
        label: 'Estrutura do produto ' + $event.toString(),
        value: $event.toString()
      }

      let ItemsAux = [this.produtos[indexProduto]];
        
      const mapSubItems = (item) => {
        if (!item.subItems) {
          return { label: item.label, value: item.value };
        }
        return {
          label: item.label,
          value: item.value,
          subItems: item.subItems.map(mapSubItems)
        };
      };

      treeViewItem = ItemsAux.map(mapSubItems)[0];

      this.produtosTree[indexEstrutura] = [{ ...treeViewItem }]

      // Define tabela de produtos
      const mapSubItemsTable = (item) => {
        if (!item.subItems) {
          return { 
            estrutura: labelEst,
            pai: item.pai,
            value: item.value,
            label: item.label,
            UM: item.UM,
            quantidade: item.quantidade,
            peso: item.peso,
            custounit: item.custounit,
            custototal: item.custototal,
            custostandard: item.custostandard
          };
        }
        return [{ 
          estrutura: labelEst,
          pai: item.pai,
          value: item.value,
          label: item.label,
          UM: item.UM,
          quantidade: item.quantidade,
          peso: item.peso,
          custounit: item.custounit,
          custototal: item.custototal,
          custostandard: item.custostandard
        }, ...item.subItems.flatMap(mapSubItemsTable)];
      };
      
      let produtoEstrutura: any = ItemsAux.flatMap(mapSubItemsTable);
      this.produtosEstrutura = this.produtosEstrutura.filter(
        item => item.estrutura !== labelEst
      );
      this.produtosEstrutura = [ ...this.produtosEstrutura, ...produtoEstrutura ]
      this.produtosEstruturaBkp = [ ...this.produtosEstrutura]
    }



    sumTotal(row: any) {
      if (row.value) {
        this.total += row.value;
      }
    }

    lastSelectedIndex: number | null = null;
    selectedIndex: number = 0;
    onRowClick(event: MouseEvent): void {
      console.log('onRowClick')
      console.log(event.shiftKey)

      if (event.shiftKey && this.lastSelectedIndex !== null) {
        const start = Math.min(this.lastSelectedIndex, this.selectedIndex);
        const end = Math.max(this.lastSelectedIndex, this.selectedIndex);

        for (let i = start; i <= end; i++) {
          this.produtosEstrutura[i].$selected = true;
        }
      }
      this.lastSelectedIndex = this.selectedIndex; 
    }

    //// Código original do componente

    columnsItemsSelected: Array<PoTableColumn> = [{ property: 'item', label: 'Serviço', },{ property: 'valor', label: 'Valor', type: 'currency'}];
    confirmed: boolean = false;
  
    addItem(seletectedItem) {
      
      const mapSubItemsValue = (item) => {
        if (!item.subItems) {
          return item.value;
        }
        return [item.value, ...item.subItems.flatMap(mapSubItemsValue)];
      };

      let itensFiltroSelec: any = this.produtosEstrutura.flatMap(mapSubItemsValue);
      let itensFiltro: any = [seletectedItem].flatMap(mapSubItemsValue);

      if (this.produtosEstrutura.length < this.produtosEstruturaBkp.length) {
        itensFiltro = [...itensFiltro, ...itensFiltroSelec]
      }
      
      this.produtosEstrutura = this.produtosEstruturaBkp;
      this.produtosEstrutura = this.produtosEstrutura.filter(
        itemSelected => itensFiltro.includes(itemSelected.value)
      );
    }
  
    checkOut() {
      this.confirmed = true;
      this.stepper.next();
    }
  
    isConfirmed() {
      return !!this.confirmed;
    }
  
    removeItem(unseletectedItem) {
      unseletectedItem = [unseletectedItem];

      const mapSubItemsValue = (item) => {
        if (!item.subItems) {
          return item.value;
        }
        return [item.value, ...item.subItems.flatMap(mapSubItemsValue)];
      };
      
      let itensFiltro: any = unseletectedItem.flatMap(mapSubItemsValue);
      
      this.produtosEstrutura = this.produtosEstrutura.filter(
        item => !itensFiltro.includes(item.value)
      );

      if (this.produtosEstrutura.length === 0) {
        this.produtosEstrutura = this.produtosEstruturaBkp;
      } else {
        this.produtosEstruturaBkp = this.produtosEstrutura;
      }
    }
  
    constructor(
      private poAlert: PoDialogService,
      private cadastraEstruturaService: CadastraEstruturaService, 
      private poNotification: PoNotificationService,
      private poDialog: PoDialogService,
      private router: Router
  ) {}
  
    actions: Array<PoTableAction> = [
      { action: this.details.bind(this), icon: 'po-icon-eye', label: 'Visualizar', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-edit', label: 'Editar (versionar)', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-doc-xls', label: 'Exportar excel pendentes', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-export', label: 'Exportar projeto', separator: true },
      { action: this.email.bind(this), icon: 'po-icon-mail', label: 'Enviar excel por e-mail', separator: true },
    ];
    columns: Array<PoTableColumn> = [];
    columnsDefault: Array<PoTableColumn> = [];
    detail: any;
    produtos: Array<any> = [];
    total: number = 0;
    totalExpanded: number = 0;
    initialColumns: Array<any> = [];

    estruturas: Array<any> = []
  
    ngOnInit(): void {
      this.produtos = this.cadastraEstruturaService.getItems();
      this.columns = this.cadastraEstruturaService.getColumns();

      this.estruturas.push({ index: this.estruturas.length }); 
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
      this.produtos.forEach((item, index) => {
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
      this.produtos = items;
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
      this.accordion.expandAllItems();
      this.estruturas.forEach((item, index) => {
        if (item.detail) {
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

    private beforeRedirect(itemBreadcrumbLabel) {
      this.poDialog.confirm({
        title: `Retornar para ${itemBreadcrumbLabel}`,
        message: `Deseja retornar? Os dados não salvos serão perdidos.`,
        confirm: () => this.router.navigate(['/' + itemBreadcrumbLabel])
      });
    }

    

    

    opcoesServicos: Array<PoMultiselectOption> = [
      { value: 'Servico1', label: 'Servico 1' },
      { value: 'Servico2', label: 'Servico 2' },
      { value: 'Servico3', label: 'Servico 3' },
      { value: 'Servico4', label: 'Servico 4' },
      { value: 'Servico5', label: 'Servico 5' },
      { value: 'Servico6', label: 'Servico 6' },
      { value: 'Servico7', label: 'Servico 7' },
      { value: 'Servico8', label: 'Servico 8' },
      { value: 'Servico9', label: 'Servico 9' },
      { value: 'Servico10', label: 'Servico 10' }
    ];

    changeservico($event) {
      console.log('event')
      console.log($event)
      this.itemsListSelected.push({ 
        item: $event, 
        label: $event, 
      });
      console.log(this.estruturas);
    }
}
