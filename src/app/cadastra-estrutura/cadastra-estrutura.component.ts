import { Component, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CadastraEstruturaService } from './shared/service/cadastra-estrutura.service';
import { PoBreadcrumb, PoDialogService, PoModalComponent, PoMultiselectOption, 
  PoNotificationService, PoSelectOptionGroup, PoStepperComponent, PoTableAction, 
  PoTableColumn, PoTableComponent, PoTreeViewItem, SharedModule, PoStepComponent } 
  from '../shared/shared.module';
import { PoAccordionComponent, PoAccordionItemComponent, PoModalAction, PoNotification, PoStepperModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';

@Component({
    selector: 'app-cadastra-estrutura',
    imports: [SharedModule, NgFor, NgIf],
    templateUrl: './cadastra-estrutura.component.html',
    styleUrl: './cadastra-estrutura.component.css'
})
export class CadastraEstruturaComponent {
    
    @ViewChild('stepper', { static: true }) stepper!: PoStepperComponent;
    @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
    @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
    @ViewChild('definicaoForm', { static: true }) definicaoForm!: NgForm;
    @ViewChild(PoAccordionComponent, { static: true }) accordion!: PoAccordionComponent;
    @ViewChild(PoAccordionItemComponent, { static: true }) accordionItem!: PoAccordionItemComponent;
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Variáveis para o componente de estrutura
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    produtosEstrutura: Array<any> = [];
    produtosEstruturaCopiar: Array<any> = [];
    produtosEstruturaCompleta: Array<any> = [];
    filteredProdutosEstrutura: Array<any> = [];
    produtosTree: Array<any> = [Array<PoTreeViewItem>];
    itemsListSelected: Array<any> = [];
    isLoadingPayment: boolean = false;
    confirmaEstrutura: boolean = false;
    statusEstrutura: boolean = true;
    tipoEstrutura: boolean = true;
    tipoEstEspecial: boolean = true;
    acaoBotoesTable: boolean = true;
    nomeEstrutura: string = '';
    areaInterna: string = '';
    areaExterna: string = '';
    codigoEstrutura: string = '';
    lastSelectedIndex: number | null = null;
    selectedIndex: number = 0;
    poDialog: any;
    itemsServicos: Array<any> = [{ item: 'Mão de Obra', valor: 0 }, { item: 'Kit de Tinta', valor: 0 }, { item: 'C+S+F', valor: 0 }];

    public readonly breadcrumb: PoBreadcrumb = {
      items: [
        { label: 'Orçamentos', action: this.beforeRedirect.bind(this,'orcamentos') }, 
        { label: 'Estruturas', action: this.beforeRedirect.bind(this,'orcamentos/estrutura') }, 
        { label: 'Cadastro' }
      ]
    };

    tipoEquipamento: Array<PoSelectOptionGroup> = [
      {
      label: 'Tipos de Estrutura',
      options: [
        { value: 'livre', label: 'Estrutura Livre' },
        { value: 'GG', label: 'GASTOS GERAIS' },
        { value: 'MC', label: 'MATERIAL DE CONSUMO' },
        { value: 'ME', label: 'MERCADORIA' },
        { value: 'MO', label: 'MAO DE OBRA' },
        { value: 'MP', label: 'MATERIA PRIMA' },
        { value: 'PA', label: 'PRODUTO ACABADO' }
      ]
      }
    ];

    grupoEstrutura: Array<PoSelectOptionGroup> = [
      {
        label: 'Tipos de Estrutura',
        options: [
          { value: '00', label: 'SERVICOS TERCEIROS' },
          { value: '01', label: 'MATERIA-PRIMA' },
          { value: '02', label: 'MATERIAL ELETRICO' },
          { value: '03', label: 'ELEMENTOS FIXACAO' },
          { value: '04', label: 'MAO TRANSMISSAO' },
          { value: '05', label: 'HIDRAULICOS E PNEUMA' },
          { value: '06', label: 'SECUNDARIO' },
          { value: '07', label: 'CONSUMO' },
          { value: '08', label: 'PRODUTO CONSERTO' },
          { value: '09', label: 'MAO INFORMATICA' },
          { value: '10', label: 'OUTROS CUSTOS' },
          { value: '100', label: 'PRODUTOS CARDALL' }
        ]
      }
    ];

    listaFiltros: Array<any> = [
      { label: 'Estrutura', value: ['estrutura'] },
      { label: 'Produto', value: ['pai','value','label'] },
      { label: 'UM', value: 'UM' },
      { label: 'Quantidade', value: 'quantidade' },
      { label: 'Peso', value: 'peso' },
      { label: 'Custo Unitário', value: 'custounit' },
      { label: 'Custo Total', value: 'custototal' },
      { label: 'Custo Standard', value: 'custostandard' },
    ];

    colunasServicos: Array<PoTableColumn> = [{ property: 'item', label: 'Serviço', },{ property: 'valor', label: 'Valor', type: 'currency'}];



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // lista de funções do componente
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Teclas de atalho 
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
      if (event.ctrlKey && event.key === 'c' || event.metaKey && event.key === 'c' && !this.acaoBotoesTable) {
        this.copiarEstrutura();
      } else if (event.ctrlKey && event.key === 'v' || event.metaKey && event.key === 'v' && this.produtosEstruturaCopiar.length > 0) {
        this.colarEstrutura();
      } else if (event.key === 'Delete') {
        this.deletarProdutoEstrutura();
      }
    }

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
      this.itemsServicos.push([{ item: 'Mão de Obra', valor: 0 }, { item: 'Kit de Tinta', valor: 0 }, { item: 'C+S+F', valor: 0 }]);
    }

    removerEstrutura(index) {
      this.estruturas.splice(index, 1);
      this.produtosTree.splice(index, 1);

      this.produtosEstrutura = this.produtosEstruturaCompleta;

      this.produtosEstrutura = this.produtosEstrutura.filter(
        item => item.estrutura !== (index+1)
      );

      this.produtosEstrutura.forEach((item) => {
        if (item.estrutura > (index+1)) {
          item.estrutura = item.estrutura - 1;
        }
      });
      this.filteredProdutosEstrutura = [...this.produtosEstrutura];

      this.produtosEstruturaCompleta = this.produtosEstrutura;
    }

    onChangeProduto($event, indexEstrutura) {
      
      let treeViewItem: PoTreeViewItem
      let labelEst: number = indexEstrutura + 1;

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
          return { 
            label: item.label, 
            value: item.value, 
            pai: item.pai,
            subItems: []
          };
        }
        return {
          label: item.label,
          value: item.value,
          pai: item.pai,
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
      this.produtosEstrutura = [ ...this.produtosEstrutura, ...produtoEstrutura ];
      this.filteredProdutosEstrutura = [...this.produtosEstrutura];
      this.produtosEstruturaCompleta = [ ...this.produtosEstrutura];
    }

    selecionarTreeIrem(seletectedItem) {
      
      const mapSubItemsValue = (item) => {
        if (!item.subItems) {
          return item.value;
        }
        return [item.value, ...item.subItems.flatMap(mapSubItemsValue)];
      };

      let itensFiltroSelec: any = this.produtosEstrutura.flatMap(mapSubItemsValue);
      let itensFiltro: any = [seletectedItem].flatMap(mapSubItemsValue);

      if (this.produtosEstrutura.length < this.produtosEstruturaCompleta.length) {
        itensFiltro = [...itensFiltro, ...itensFiltroSelec]
      }
      
      this.produtosEstrutura = this.produtosEstruturaCompleta;
      this.produtosEstrutura = this.produtosEstrutura.filter(
        itemSelected => itensFiltro.includes(itemSelected.value)
      );
      this.filteredProdutosEstrutura = [...this.produtosEstrutura];
    }

    removerTreeItem(unseletectedItem) {
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
        this.produtosEstrutura = this.produtosEstruturaCompleta;
      } else {
        this.produtosEstruturaCompleta = this.produtosEstrutura;
      }
    }

    selecionarProduto(row: any) {
      this.acaoBotoesTable = false
      
      this.selectedIndex = this.produtosEstrutura.findIndex(
        (optionItem) => optionItem.value === row.value
      );

      if (row.value) {
        this.total += row.value;
      }
    }

    deselecionarProduto(row: any) {
      let acaoDeletar = !this.produtosEstrutura.find(function(estrutura) { 
        return estrutura.$selected
      })
      
      this.acaoBotoesTable = acaoDeletar
      if (row.value) {
        this.total -= row.value;
      }
    }
    
    cliqueLinha(event: MouseEvent): void {
      if (event.shiftKey && this.lastSelectedIndex !== null) {
        const start = Math.min(this.lastSelectedIndex, this.selectedIndex);
        const end = Math.max(this.lastSelectedIndex, this.selectedIndex);
        
        for (let i = start; i <= end; i++) {
          this.produtosEstrutura[i].$selected = true;
        }
      }
      this.lastSelectedIndex = this.selectedIndex; 
    }
    
    copiarEstrutura(){
      let itensFiltro: any = this.produtosEstrutura.flatMap(
        (item) => {
          if (item.$selected) {
            return `${item.estrutura}-${item.value}`;
          }
          return [];
        }
      );

      this.produtosEstrutura.forEach((item) => {
        if (itensFiltro.includes(`${item.estrutura}-${item.pai}`)) {
          itensFiltro.push(`${item.estrutura}-${item.value}`);
        }
      });
      
      this.produtosEstruturaCopiar = this.produtosEstrutura
        .filter(item => itensFiltro.includes(`${item.estrutura}-${item.value}`))
        .map(item => ({ ...item }));

      const poNotification: PoNotification = {
        message: 'Copiado.',
        orientation: undefined,
        action: undefined,
        actionLabel: '',
        duration: 500
      };
      this.poNotification.success(poNotification);
      this.poTable.unselectRows();
      this.acaoBotoesTable = true;

    }

    colarEstrutura(){
      if (this.produtosEstruturaCopiar.length > 0){

        const selectedIndex = this.produtosEstrutura.findIndex(item => item.$selected);
        if (selectedIndex !== -1) {
          const itemColar = this.produtosEstrutura[selectedIndex];
          const beforeItems = this.produtosEstrutura.slice(0, selectedIndex + 1);
          const afterItems = this.produtosEstrutura.slice(selectedIndex + 1);
          const estruturaColar = this.produtosEstrutura[selectedIndex].estrutura - 1;
          const updatedCopiedItems = this.produtosEstruturaCopiar.map(item => ({
            ...item,
            estrutura: this.produtosEstrutura[selectedIndex].estrutura,
            pai: this.produtosEstruturaCopiar.some(copiedItem => copiedItem.value === item.pai) ? item.pai : this.produtosEstrutura[selectedIndex].value,
          }));
          
          this.produtosEstrutura = [...beforeItems, ...updatedCopiedItems, ...afterItems];
          this.filteredProdutosEstrutura = [...this.produtosEstrutura];
          this.produtosEstruturaCompleta = [...this.produtosEstrutura];

            const buildTree = (items) => {
            const map = new Map();
            const roots: PoTreeViewItem[] = [];

            items.forEach(item => {
              const newItem = { 
              label: item.label, 
              value: item.value, 
              pai: item.pai, 
              subItems: [] 
              };
              map.set(item.value, newItem);

              if (item.pai === null || !map.has(item.pai)) {
              roots.push(newItem);
              } else {
              const parent = map.get(item.pai);
              parent.subItems.push(newItem);
              }
            });

            return roots;
          };

          const copiedTreeItems = buildTree(updatedCopiedItems);

          const findAndConcatItems = (items, value, pai, copiedItems) => {
            for (let i = 0; i < items.length; i++) {
              if (items[i].value === value && items[i].pai === pai) {
                items[i].subItems = [...items[i].subItems, ...copiedItems];
                return true;
              }
              if (items[i].subItems) {
                const found = findAndConcatItems(items[i].subItems, value, pai, copiedItems);
                if (found) {
                  return true;
                }
              }
            }
            return false;
          };

          findAndConcatItems(this.produtosTree[estruturaColar], itemColar.value, itemColar.pai, copiedTreeItems);
          
          this.produtosTree[estruturaColar] = [...this.produtosTree[estruturaColar]];

          const poNotification: PoNotification = {
            message: 'Colado.',
            orientation: undefined,
            action: undefined,
            actionLabel: '',
            duration: 500
          };
          
          this.produtosEstruturaCopiar = [];
          this.poNotification.success(poNotification);
          this.poTable.unselectRows();
          this.acaoBotoesTable = true;
        }
      }
    }

    deletarProdutoEstrutura() {
      if (!this.acaoBotoesTable){

        this.poAlert.confirm({
          literals:  { "cancel": "Não", "confirm": "Sim" },
          title: "Excluir",
          message: 'Deseja remover os produtos selecionados da estrutura?',
          confirm: () => {
            let itensFiltro: any = this.produtosEstrutura.flatMap(
              (item) => {
                if (item.$selected) {
                  return `${item.estrutura}-${item.value}`;
                }
                return [];
              }
            );

            this.produtosEstrutura.forEach((item) => {
              if (itensFiltro.includes(`${item.estrutura}-${item.pai}`)) {
                itensFiltro.push(`${item.estrutura}-${item.value}`);
              }
            });
            
            this.produtosEstrutura = this.produtosEstrutura.filter(
              item => !itensFiltro.includes(`${item.estrutura}-${item.value}`)
            );

            this.produtosEstruturaCompleta = this.produtosEstruturaCompleta.filter(
              item => !itensFiltro.includes(`${item.estrutura}-${item.value}`)
            );

            if (this.produtosEstrutura.length === 0) {
              this.produtosEstrutura = this.produtosEstruturaCompleta;
            }

            const mapSubItemsDeleteValue = (item,treeIndex) => {
              if (!item.subItems) {
                return !itensFiltro.includes(`${treeIndex}-${item.value}`);
              }
              item.subItems = item.subItems.filter(subItem => mapSubItemsDeleteValue(subItem,treeIndex));
              return !itensFiltro.includes(`${treeIndex}-${item.value}`) || item.subItems.length > 0;
            };

            this.produtosTree = this.produtosTree.map((tree, treeIndex) => 
              tree.filter(item => mapSubItemsDeleteValue(item, treeIndex+1))
            );

            let acaoDeletar = !this.produtosEstrutura.find(function(estrutura) { 
              return estrutura.$selected
            })
            
            this.acaoBotoesTable = acaoDeletar
          }
        });

      }
    } 

    filtrarProdutos(event: Array<any>) {
      if (event.length === 0) {
        this.produtosEstrutura = this.produtosEstruturaCompleta;
      } else  {
        this.produtosEstrutura = event;
      }
    }

    VerificarFiltroProdutos(event: Array<any>) {
      if (!event) {
        this.produtosEstrutura = this.produtosEstruturaCompleta;
      }
    }

    gerarMaoDeObra(){

    }    

    // modal
    produtosBusca: Array<any> = [];
    tituloModel: string = 'Adicionar novo item à estrutura';
    columnsProdutosBusca: Array<PoTableColumn> = [];


    listaFiltrosBusca: Array<any> = [
      { label: 'Estrutura', value: ['estrutura'] },
      { label: 'Produto', value: ['produto'] },
      { label: 'Produto Genérico', value: ['generico'] },
      { label: 'Serviço', value: ['servico'] }
    ];
     
    public readonly filters: Array<PoPageDynamicSearchFilters> = [
      { property: 'Código', gridColumns: 6 },
    ];

    readonly literals: PoPageDynamicSearchLiterals = {
      filterConfirmLabel: 'Aplicar',
      filterTitle: 'Filtro avançado',
      quickSearchLabel: 'Valor pesquisado:'
    };

    onLoadModal() {
      return this.cadastraEstruturaService.getPageOptions();
    }
      
    close: PoModalAction = {
      action: () => {
        this.poModal.close();
      },
      label: 'Fechar',
      danger: true
    };   

    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //// Código original do componente
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    columnsItemsSelected: Array<PoTableColumn> = [{ property: 'item', label: 'Serviço', },{ property: 'valor', label: 'Valor', type: 'currency'}];
    confirmed: boolean = false;
  
    
  
    checkOut() {
      this.confirmed = true;
      this.stepper.next();
    }
  
    isConfirmed() {
      return !!this.confirmed;
    }
  
    
  
    constructor(
      private poAlert: PoDialogService,
      private cadastraEstruturaService: CadastraEstruturaService, 
      private poNotification: PoNotificationService,
      private router: Router,
      private cdr: ChangeDetectorRef
  ) {}
  
    actions: Array<PoTableAction> = [
      { action: this.details.bind(this), icon: 'po-icon-eye', label: 'Visualizar', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-edit', label: 'Editar (versionar)', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-doc-xls', label: 'Exportar excel pendentes', separator: true },
      { action: this.details.bind(this), icon: 'po-icon-export', label: 'Exportar projeto', separator: true },
      { action: this.email.bind(this), icon: 'po-icon-mail', label: 'Enviar excel por e-mail', separator: true },
    ];
    columnsProdutosEstrutura: Array<PoTableColumn> = [];
    columnsDefault: Array<PoTableColumn> = [];
    detail: any;
    produtos: Array<any> = [];
    total: number = 0;
    totalExpanded: number = 0;
    initialColumns: Array<any> = [];

    estruturas: Array<any> = []
  
    ngOnInit(): void {
      this.produtos = this.cadastraEstruturaService.getItems();
      this.columnsProdutosEstrutura = this.cadastraEstruturaService.getColumns();

      //this.estruturas.push({ index: this.estruturas.length }); 
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
  
    
  
    
  
    details() {
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
      this.columnsProdutosEstrutura = this.columnsDefault;
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
