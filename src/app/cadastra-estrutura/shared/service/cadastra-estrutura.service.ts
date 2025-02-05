import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class CadastraEstruturaService {

  constructor(public http: HttpClient) {}
  
    getColumns(): Array<PoTableColumn> {
      return [
        { property: 'estrutura', label: 'Estrutura', type: 'number' },
        { property: 'pai', label: 'Prod. Pai' },
        { property: 'value', label: 'Produto' },
        { property: 'label', label: 'Descrição' },
        { property: 'UM', label: 'UM' }, 
        { property: 'quantidade', label: 'Quantidade', type: 'number' },
        { property: 'peso', label: 'Peso', type: 'number' },
        { property: 'custounit', type: 'currency', label: 'Custo Unitário' },
        { property: 'custototal', type: 'currency', label: 'Custo Total' },
        { property: 'custostandard', type: 'currency', label: 'Custo Standard' }
      ];
    }
  
    getItems() {
      return [
        {
          value: 1,
          pai: '',
          label: 'Produto 1',
          UM: 'KG',
          quantidade: 2,
          peso: 5,
          custounit: 100,
          custototal: 210,
          custostandard: 210,
          subItems: [
            {
              value: 11,
              pai: 1,
              label: 'Produto 11',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210,
              subItems: [
                {
                  value: 111,
                  pai: 11,
                  label: 'Produto 111',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210,
                  subItems: [
                    {
                      value: 1111,
                      pai: 111,
                      label: 'Produto 1111',
                      UM: 'KG',
                      quantidade: 2,
                      peso: 5,
                      custounit: 100,
                      custototal: 210,
                      custostandard: 210
                    },
                    {
                      value: 1112,
                      pai: 111,
                      label: 'Produto 1112',
                      UM: 'KG',
                      quantidade: 2,
                      peso: 5,
                      custounit: 100,
                      custototal: 210,
                      custostandard: 210
                    },
                    {
                      value: 1113,
                      pai: 111,
                      label: 'Produto 1113',
                      UM: 'KG',
                      quantidade: 2,
                      peso: 5,
                      custounit: 100,
                      custototal: 210,
                      custostandard: 210
                    }
                  ]
                },
                {
                  value: 112,
                  pai: 11,
                  label: 'Produto 112',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 113,
                  pai: 11,
                  label: 'Produto 113',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                }
              ]
            },
            {
              value: 12,
              pai: 1,
              label: 'Produto 12',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210,
              subItems:[
                {
                  value: 121,
                  pai: 12,
                  label: 'Produto 121',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 122,
                  pai: 12,
                  label: 'Produto 122',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 123,
                  pai: 12,
                  label: 'Produto 123',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                }
              ]
            },
            {
              value: 13,
              pai: 1,
              label: 'Produto 13',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            }
          ]
        },
        {
          value: 2,
          pai: '',
          label: 'Produto 2',
          UM: 'KG',
          quantidade: 2,
          peso: 5,
          custounit: 400,
          custototal: 800,
          custostandard: 210,
          subItems: [
            {
              value: 21,
              pai: 2,
              label: 'Produto 21',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210,
              subItems: [
                {
                  value: 211,
                  pai: 21,
                  label: 'Produto 211',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 212,
                  pai: 21,
                  label: 'Produto 212',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 213,
                  pai: 21,
                  label: 'Produto 213',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                }
              ]
            },
            {
              value: 22,
              pai: 2,
              label: 'Produto 22',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            },
            {
              value: 23,
              pai: 2,
              label: 'Produto 23',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            }
          ] 
        },
        {
          value: 3,
          pai: '',
          label: 'Produto 3',
          UM: 'KG',
          quantidade: 2,
          peso: 5,
          custounit: 100,
          custototal: 210,
          custostandard: 210 
        },
        {
          value: 4,
          pai: '',
          label: 'Produto 4',
          UM: 'KG',
          quantidade: 2,
          peso: 5,
          custounit: 100,
          custototal: 210,
          custostandard: 210,
          subItems:[
            {
              value: 41,
              pai: 4,
              label: 'Produto 41',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            },
            {
              value: 42,
              pai: 4,
              label: 'Produto 42',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            },
            {
              value: 43,
              pai: 4,
              label: 'Produto 43',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            }
          ]
        },
        {
          value: 5,
          pai: '',
          label: 'Produto 5',
          UM: 'PC',
          quantidade: 2,
          peso: 5,
          custounit: 100,
          custototal: 210,
          custostandard: 210,
          subItems: [
            {
              value: 51,
              pai: 5,
              label: 'Produto 51',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210,
              subItems: [
                {
                  value: 511,
                  pai: 51,
                  label: 'Produto 511',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 512,
                  pai: 51,
                  label: 'Produto 512',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                },
                {
                  value: 513,
                  pai: 51,
                  label: 'Produto 513',
                  UM: 'KG',
                  quantidade: 2,
                  peso: 5,
                  custounit: 100,
                  custototal: 210,
                  custostandard: 210
                }
              ]
            },
            {
              value: 52,
              pai: 5,
              label: 'Produto 52',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            },
            {
              value: 53,
              pai: 5,
              label: 'Produto 53',
              UM: 'KG',
              quantidade: 2,
              peso: 5,
              custounit: 100,
              custototal: 210,
              custostandard: 210
            }
          ]
        }
      ];
    }
}
