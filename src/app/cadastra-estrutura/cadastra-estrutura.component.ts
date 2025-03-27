import { Component, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CadastraEstruturaService } from './shared/service/cadastra-estrutura.service';
import { ParametrosEstruturaService } from '../parametros-estrutura/shared/service/parametros-estrutura.service';
import { PoBreadcrumb, PoDialogService, PoModalComponent, PoMultiselectOption, 
  PoNotificationService, PoSelectOptionGroup, PoStepperComponent, PoTableAction, 
  PoTableColumn, PoTableComponent, PoTreeViewItem, SharedModule, PoStepComponent } 
  from '../shared/shared.module';
import { PoAccordionComponent, PoAccordionItemComponent, PoModalAction, PoNotification, PoStepperModule, PoTableColumnSpacing } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';
import { api } from '../model/api';
import { Parametros } from '../cadastra-parametros/shared/interface/parametros';

const apiData: api = new api();

@Component({
    selector: 'app-cadastra-estrutura',
    standalone: true,
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
  isLoadingBusca: boolean = false;
  confirmaEstrutura: boolean = false;
  statusEstrutura: boolean = true;
  tipoEstrutura: boolean = true;
  tipoEstEspecial: boolean = true;
  acaoBotoesTable: boolean = true;
  nomeEstrutura: string = '';
  parametroEstrutura: Array<any> = [];
  parametroEstruturaEspecial: Array<any> = [];
  areaInterna: number = 0;
  areaExterna: number = 0;
  observacao: string = '';
  codigoEstrutura: string = '';
  lastSelectedIndex: number | null = null;
  selectedIndex: number = 0;
  poDialog: any;
  parametrosUrl: string = apiData.URL + '/cardallapis/ZX2/ZX2_DESC';
  estruturaSelecionadaIndex: any = null;
  produtoTreeViewSelecionado: any = null;
  columnsItemsSelected: Array<PoTableColumn> = [{ property: 'item', label: 'Serviço', },{ property: 'valor', label: 'Valor', type: 'currency', format: 'BRL'}];
  confirmed: boolean = false;
  columnsProdutosEstrutura: Array<PoTableColumn> = [];
  columnsDefault: Array<PoTableColumn> = [];
  detail: any;
  produtos: Array<any> = [];
  total: number = 0;
  totalExpanded: number = 0;
  initialColumns: Array<any> = []; 
  estruturas: Array<any> = [];
  produtosBusca: Array<any> = [];
  tituloModel: string = 'Adicionar novo item à estrutura';
  columnsProdutosBusca: Array<PoTableColumn> = [];
  
  itemsTotalGeral: Array<any> = [];
  itemsTotais: Array<any> = []; 
  itemsTotaisDef: Array<any> = [
      { item: 'Matéria-Prima', valor: 0 },
      { item: 'Material Elétrico', valor: 0 },
      { item: 'Elementos de Fixação', valor: 0 },
      { item: 'Transmissão', valor: 0 },
      { item: 'Hidráulicos e Pneumáticos', valor: 0 },
      { item: 'Secundários', valor: 0 },
      { item: 'Material de Consumo', valor: 0 },
      { item: 'Material Comercial', valor: 0 },
      { item: 'Material Transformação', valor: 0 },
      { item: 'Total Geral de Materiais', valor: 0 },
      { item: 'Total Serviços Gerais', valor: 0 },
      { item: 'Total Mão-de-Obra', valor: 0 },
      { item: 'Total Outros', valor: 0 },
      { item: 'Custo Total do Produto', valor: 0 },
      { item: 'Total Geral', valor: 0 } 
  ]; 
  
  readonly tableSpacing: PoTableColumnSpacing = PoTableColumnSpacing.Small;
  
  readonly colunasTotais: Array<PoTableColumn> = [
    { property: 'item', label: 'Descrição' },
    { property: 'valor', label: 'Valor', type: 'currency', format: 'BRL' },
    { property: 'horas', label: 'Horas' },
    { property: 'peso', label: 'Peso' },
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Orçamentos', action: this.beforeRedirect.bind(this,'orcamentos') }, 
      { label: 'Estruturas', action: this.beforeRedirect.bind(this,'orcamentos/estrutura') }, 
      { label: 'Cadastro' }
    ]
  };

  parametros: Parametros = {
    items: [],
    hasNext: false,
    remaningRecords: 0
  };

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

  pageActions: Array<PoTableAction> = [
    { action: this.salvarEstrutura.bind(this), label: 'Salvar', separator: true, visible: this.isConfirmedEstrutura.bind(this,2), type: 'primary' },
    { action: this.beforeRedirect.bind(this,'orcamentos/estrutura'), label: 'Voltar', separator: true, type: 'secondary' },
  ];

  actions: Array<PoTableAction> = [
    { action: this.editarProdutoEstrutura.bind(this), icon: 'po-icon-edit', label: ' ', separator: true },
  ];

  selecionar: PoModalAction = {
    action: () => {
      this.selecionarProdutoBusca();
    },
    label: 'Selecionar'
  };   

  novoProduto: PoModalAction = {
    action: () => {
      console.log('novo produto');
    },
    label: 'Novo Produto'
  };

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // lista de funções do componente
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private poAlert: PoDialogService,
    private cadastraEstruturaService: CadastraEstruturaService, 
    private parametrosEstruturaService: ParametrosEstruturaService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.produtos = this.cadastraEstruturaService.getItems();
    this.columnsProdutosEstrutura = this.cadastraEstruturaService.getColumns();
    this.columnsProdutosBusca = this.cadastraEstruturaService.getColumnsBusca();

    this.parametrosEstruturaService.getParametros().subscribe(params => {
      this.parametros = params as Parametros;
    });
  }

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

  editarProdutoEstrutura(row: any) {
    console.log('row', row);
    this.poNotification.success('Editar Produto Estrutura');
  }

  onChangeTipoEstrutura($event) {
  }

  isConfirmedEstrutura(step: number) {
    this.confirmaEstrutura = true;

    if (step === 1) {
      if (this.definicaoForm.valid) {
        this.confirmaEstrutura = true;
      } else {
        this.confirmaEstrutura = false;
      }
    } else if (step === 2) {
      if (this.produtosEstrutura.length > 0) {
        this.confirmaEstrutura = true;
      } else {
        this.confirmaEstrutura = false;
      }
    }
    return !!this.confirmaEstrutura;
  }

  adicionarEstrutura(label: string) {
    if (this.estruturas.length > 0) {
      this.produtosTree.push(Array<PoTreeViewItem>);
    }
    this.estruturas.push({ 
      index: this.estruturas.length, 
      label: label
    });
    this.itemsTotais.push({});
    this.parametroEstruturaEspecial.push("");
    return this.estruturas.length;
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

  selecionarTreeIrem(seletectedItem) {
    console.log('seletectedItem', seletectedItem);
    this.produtoTreeViewSelecionado = seletectedItem;
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

  BuscarProdutos(event: Array<any>) {
    this.isLoadingBusca = true;
    this.cadastraEstruturaService.getProdutos(event).subscribe(produtos => {
      console.log(produtos);
      this.produtosBusca = produtos as any && (produtos as any).items || [];
      this.isLoadingBusca = false;
    });
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
  
  onLoadModal() {
    return this.cadastraEstruturaService.getPageOptions();
  } 

  selecionarProdutoBusca(): void {
    // preencher produtosEstrutura com os produtosBusca com $Selected
    this.produtosBusca.forEach(item => {
      if (item.$selected){
        // valida se item não está dentro de this.produotos
        if (!this.produtos.find(produto => produto.value === item.value)) { 
          
          // Se estrutura estiver selecionada, adiciona item na treeView
          let idEstrutura: number;
          if (this.estruturaSelecionadaIndex !== null) {
            idEstrutura = this.estruturaSelecionadaIndex + 1; 
            item.pai = this.produtoTreeViewSelecionado.value;
          } else { 
            idEstrutura = this.adicionarEstrutura(item.value + ' - ' + item.label);
          }

          item.estrutura = idEstrutura;
          
          this.produtos.push(item);

          let treeViewItem: PoTreeViewItem 

          let ItemsAux = [item];
            
          const mapsubItems = (item) => {
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
              subItems: item.subItems.map(mapsubItems)
            };
          };

          treeViewItem = ItemsAux.map(mapsubItems)[0]; 
          
          if (this.estruturaSelecionadaIndex !== null) {
            // Quando estrutura selecionada, concatena o treeViewItem como filho do produtoTreeViewSelecionado.value
            // Encontra o item pai na árvore e adiciona o novo item como filho
            const encontrarEAdicionarFilho = (items, paiId, novoItem) => {
              for (let i = 0; i < items.length; i++) {
                if (items[i].value === paiId) {
                  if (!items[i].subItems) {
                    items[i].subItems = [];
                  }
                  items[i].subItems = [...items[i].subItems, { ...novoItem }];
                  
                  return true;
                }
                if (items[i].subItems && items[i].subItems.length > 0) {
                  if (encontrarEAdicionarFilho(items[i].subItems, paiId, novoItem)) {
                    return true;
                  }
                }
              }
              return false;
            };
            
            // Se não conseguir adicionar como filho, adiciona como item raiz
            if (encontrarEAdicionarFilho(this.produtosTree[idEstrutura-1], this.produtoTreeViewSelecionado.value, treeViewItem)) {
              this.produtosTree[idEstrutura-1] = [...this.produtosTree[idEstrutura-1]]
            } else {
              this.produtosTree[idEstrutura-1] = [...this.produtosTree[idEstrutura-1], { ...treeViewItem }]
            }

          } else {
            this.produtosTree[idEstrutura-1] = [{ ...treeViewItem }]
          }


          // Define tabela de produtos
          const mapsubItemsTable = (item) => {
            if (!item.subItems) {
              return { 
                estrutura: idEstrutura,
                pai: item.pai,
                value: item.value,
                label: item.label,
                UM: item.UM,
                quantidade: item.quantidade,
                peso: item.peso,
                custounit: item.custounit,
                custototal: item.custototal,
                custostandard: item.custostandard,
                tipo: item.tipo,
                grupo: item.grupo,
                subgrupo: item.subgrupo
              };
            }
            return [{ 
              estrutura: idEstrutura,
              pai: item.pai,
              value: item.value,
              label: item.label,
              UM: item.UM,
              quantidade: item.quantidade,
              peso: item.peso,
              custounit: item.custounit,
              custototal: item.custototal,
              custostandard: item.custostandard,
              tipo: item.tipo,
              grupo: item.grupo,
              subgrupo: item.subgrupo
            }, ...item.subItems.flatMap(mapsubItemsTable)];
          };
          
          let novoProdutoEstrutura: any = ItemsAux.flatMap(mapsubItemsTable);

          console.log('novoProdutoEstrutura',novoProdutoEstrutura);
          console.log('this.produtosEstrutura',this.produtosEstrutura);
          console.log('this.produtosEstruturaCompleta',this.produtosEstruturaCompleta);

          this.produtosEstruturaCompleta = [ ...this.produtosEstruturaCompleta, ...novoProdutoEstrutura ];
          this.produtosEstrutura = [ ...this.produtosEstruturaCompleta ]; 
          
          if (this.tipoEstrutura) {
            this.calculaTotais(idEstrutura-1, this.parametroEstrutura, false);
          }
        }

      }
    });

    this.poModal.close();
  }

  onChangeParametro(event, parametro, index?: number) { 
    if (index !== undefined) {
      this.calculaTotais(index, parametro,false);
    } else {
      this.calculaTotaisEstruturas();
    }
  }

  calculaTotaisEstruturas(){
    this.estruturas.forEach(estrutura => {
      this.calculaTotais(estrutura.index-1, this.parametroEstrutura, true);
    });
  }

  calculaTotais(indexEstrutura: number, parametros: Array<any>,geral?: boolean) {
    let pesoEstrutura = 0;

    console.log('calculaTotais', indexEstrutura, geral);

    // Inicializa o array para o índice da estrutura com uma cópia profunda do array de definição
    this.itemsTotais[indexEstrutura] = JSON.parse(JSON.stringify(this.itemsTotaisDef));
    
    // Processa cada item da estrutura
    this.produtosEstrutura.forEach(item => {
      if (item.estrutura === indexEstrutura + 1 || geral) {
        console.log('item', item);

        // Calcula por tipo do material
        const grupo = item.grupo.substring(0, 2);
        const subgrupo = item.subgrupo.substring(3);
        pesoEstrutura += item.peso;


        // Matéria-Prima
        // Utiliza switch para verificar o grupo e subgrupo
        switch (true) {
          // Matéria-Prima
          case grupo === '01':
            this.itemsTotais[indexEstrutura][0].valor += item.custototal;
            break;
          
          // Material Elétrico
          case grupo === '02' || grupo === '09':
            this.itemsTotais[indexEstrutura][1].valor += item.custototal;
            break;
          
          // Elementos de Fixação
          case grupo === '03':
            this.itemsTotais[indexEstrutura][2].valor += item.custototal;
            break;
          
          // Transmissão
          case grupo === '04':
            this.itemsTotais[indexEstrutura][3].valor += item.custototal;
            break;
          
          // Hidráulicos e Pneumáticos
          case grupo === '05':
            this.itemsTotais[indexEstrutura][4].valor += item.custototal;
            break;
          
          // Secundários
          case grupo === '06':
            this.itemsTotais[indexEstrutura][5].valor += item.custototal;
            break;
          
          // Material de Consumo
          case grupo === '07':
            this.itemsTotais[indexEstrutura][6].valor += item.custototal;
            break;
          
          // Total Serviços Gerais
          case grupo === '00':
            this.itemsTotais[indexEstrutura][10].valor += item.custototal;
            break;
          
          // Total Mão-de-Obra
          case grupo === 'MOD':
            this.itemsTotais[indexEstrutura][11].valor += item.custototal;
            break;
          
          // Total Outros
          case grupo === '10' && subgrupo !== '100':
            this.itemsTotais[indexEstrutura][12].valor += item.custototal;
            break;
        } 

        // Material Comercial
        if (subgrupo === '001'){
          this.itemsTotais[indexEstrutura][7].valor += item.custototal;
        }
        
        // Material Transformação
        if (subgrupo === '002' && grupo !== '09'){
          this.itemsTotais[indexEstrutura][8].valor += item.custototal;
        }
         
      }
    });

    // arredondamento de 2 casas decimais
    pesoEstrutura = Math.round(pesoEstrutura * 100) / 100;

    // Calcula os totais gerais
    // Total Geral de Materiais (soma dos itens 0 a 8)
    this.itemsTotais[indexEstrutura][9].valor = 
      this.itemsTotais[indexEstrutura].slice(0, 9).reduce((acc, item) => acc + item.valor, 0);
    
    // Custo Total do Produto (soma de todos os itens anteriores)
    this.itemsTotais[indexEstrutura][13].valor = 
      this.itemsTotais[indexEstrutura].slice(10, 13).reduce((acc, item) => acc + item.valor, 0);

    // Calcula por parâmetros (implementação futura)
    if (this.tipoEstrutura) { // estrutura normal
      console.log('parametros', parametros);
      
      // busca parametro via API e retorna os resultados para calculos.
      parametros.forEach(parametro => {
        const parametroEncontrado = this.parametros.items.find(p => p.zx2_cod === parametro);
        if (parametroEncontrado) {
          console.log('Parâmetro encontrado:', parametroEncontrado);

          // produtividade
          let tipoProdutividade = parametroEncontrado.zx2_var;
          let modObra = parametroEncontrado.zx2_mod;
          let kitTinta = parametroEncontrado.zx2_kit;
          let produtividade = 0;
          let cmc = parametroEncontrado.zx2_cmc;
          let cmt = parametroEncontrado.zx2_cmt;
          let smc = parametroEncontrado.zx2_smc;
          let smt = parametroEncontrado.zx2_smt;
          let fmc = parametroEncontrado.zx2_fmc;
          let fmt = parametroEncontrado.zx2_fmt;
          
          if (tipoProdutividade === 'H') {
            produtividade = parametroEncontrado.zx2_vlprod;
          } else {
            produtividade = Math.round((pesoEstrutura / parametroEncontrado.zx2_vlprod) * 100) / 100;
          } 
          
          if (modObra){
            this.cadastraEstruturaService.getModObra(modObra).subscribe(response => {
              console.log('modObra', response);
              // Verificando se a propriedade existe antes de acessá-la
              let descricaoProdutividade = response && typeof response === 'object' ? (response as any).b1_desc : 'Produtividade';
              this.itemsTotais[indexEstrutura].push({ item: descricaoProdutividade, horas: produtividade });
            });
          }

          // Kit Tinta
          if (this.areaExterna > 0) {
            this.itemsTotais[indexEstrutura].push({ item: 'Area Externa', horas: this.areaExterna });
          }

          if (this.areaInterna > 0) {
            this.itemsTotais[indexEstrutura].push({ item: 'Area Interna', horas: this.areaInterna });
          } 

          if (kitTinta) {
            let descricaoKitTinta = '';
            this.cadastraEstruturaService.getKitTinta(kitTinta).subscribe(response => {
              console.log('kitTinta', response);
              descricaoKitTinta = response && typeof response === 'object' ? (response as any).b1_desc : 'Kit de Tinta';
              this.itemsTotais[indexEstrutura].push({ item: descricaoKitTinta, peso: pesoEstrutura });
            });
          }

          // consumíveis C + S + F
          // valor consumíveis MC
          let valorConsumiveisMC = this.itemsTotais[indexEstrutura][7].valor; 
          console.log('valorConsumiveisMC', valorConsumiveisMC);
          if (valorConsumiveisMC > 0) {
            if (cmc > 0) {
              let valorCmc = Math.round((valorConsumiveisMC * cmc / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Consumíveis MC', valor: valorCmc });
            }

            if (smc > 0) {
              let valorSmc = Math.round((valorConsumiveisMC * smc / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Sucata MC', valor: valorSmc });
            }

            if (fmc > 0) {
              let valorFmc = Math.round((valorConsumiveisMC * fmc / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Frete MC', valor: valorFmc });
            }
          }

          // valor consumíveis MT
          let valorConsumiveisMT = this.itemsTotais[indexEstrutura][8].valor;
          console.log('valorConsumiveisMT', valorConsumiveisMT);
          if (valorConsumiveisMT > 0) {
            if (cmt > 0) {
              let valorCmt = Math.round((valorConsumiveisMT * cmt / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Consumíveis MT', valor: valorCmt });
            } 
  
            if (smt > 0) {
              let valorSmt = Math.round((valorConsumiveisMT * smt / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Sucata MT', valor: valorSmt });
            }
  
            if (fmt > 0) {
              let valorFmt = Math.round((valorConsumiveisMT * fmt / 100) * 100) / 100;
              this.itemsTotais[indexEstrutura].push({ item: 'Frete MT', valor: valorFmt });
            }
          } 
        } else {
          console.log('Parâmetro não encontrado:', parametro);
        }
      });
    } else { 
      // estrutura especial
      // Implementação futura
    } 
    
    // Total Geral (igual ao Custo Total do Produto)
    this.itemsTotais[indexEstrutura][14].valor = this.itemsTotais[indexEstrutura][13].valor;

    // mover total geral 14 par o final do array
    //this.itemsTotais[indexEstrutura].push(this.itemsTotais[indexEstrutura].splice(14, 1)[0]);

    // Remove itens com valor zero
    this.itemsTotais[indexEstrutura] = this.itemsTotais[indexEstrutura].filter(item => item.valor > 0 || item.horas > 0);

  
    console.log('this.itemsTotais após cálculos:', this.itemsTotais);
  } 

  geraTotaisEstruturas(){
    // ao passar para o próximo passo, aglutinar itemsTotais em itemsTotalGeral, os valores de mesma propriedade devem ser somados, sem duplicidade.#accordion
    this.itemsTotalGeral = this.itemsTotais.reduce((acc, item) => {
      item.forEach(item => {
        acc[item.item] = (acc[item.item] || 0) + item.valor;
      });
      return acc;
    }, {});
    this.stepper.next();
  }

  checkOut() {
    this.confirmed = true;
    this.stepper.next();
  }

  isConfirmed() {
    return !!this.confirmed;
  }
    
  salvarEstrutura(){
    console.log('salvarEstrutura');
  } 

  collapseAll() {
    this.produtos.forEach((item, index) => {
      if (item.detail) {
        this.onCollapseDetail();
        this.poTable.collapse(index);
      }
    });
  }

  modelProdutos(indexEstrutura?: any) {
    this.estruturaSelecionadaIndex = indexEstrutura;
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

  private beforeRedirect(itemBreadcrumbLabel) {
    this.poAlert.confirm({
      title: `Retornar para ${itemBreadcrumbLabel}`,
      message: `Deseja retornar? Os dados não salvos serão perdidos.`,
      confirm: () => this.router.navigate(['/' + itemBreadcrumbLabel])
    });
  }

      
}
