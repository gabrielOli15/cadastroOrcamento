import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class CadastraOrcamentoService {

  constructor(public http: HttpClient) {}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'produto', label: 'Produto', type: 'number' },
      { property: 'descricao', label: 'Descrição' },
      { property: 'UM', label: 'UM' }, 
      { property: 'quantidade', label: 'Quantidade', type: 'number' },
      { property: 'custounit', type: 'currency', label: 'Custo Unitário' },
      { property: 'custototal', type: 'currency', label: 'Custo Total' },
      { property: 'custostandard', type: 'currency', label: 'Custo Standard' }
    ];
  }

  getItems() {
    return [
      {
        produto: 11234,
        descricao: 'Produto 1',
        UM: 'CX',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 2',
        UM: 'CX',
        quantidade: 2,
        custounit: 400,
        custototal: 800,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 3',
        UM: 'KG',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 4',
        UM: 'KG',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 5',
        UM: 'CX',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 6',
        UM: 'PC',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      },
      {
        produto: 11234,
        descricao: 'Produto 7',
        UM: 'KG',
        quantidade: 2,
        custounit: 100,
        custototal: 210,
        custostandard: 210 
      }
    ];
  }
}
