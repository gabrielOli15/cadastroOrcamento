import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn, PoTableColumnLabel } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class CadastraEstruturaService {

  constructor(public http: HttpClient) {}
  
    getColumns(): Array<PoTableColumn> {
      return [
        {
          property: 'estrutura',
          type: 'label',
          label: 'Estrutura',
          width: '5%',
          labels: <Array<PoTableColumnLabel>>[
            {
              value: 1,
              color: 'color-01',
              label: '1',
              textColor: 'white',
            },
            {
              value: 2,
              color: 'color-02',
              label: '2',
              textColor: 'white',
            },
            {
              value: 3,
              color: 'color-03',
              label: '3',
              textColor: 'white',
            },
            {
              value: 4,
              color: 'color-04',
              label: '4',
              textColor: 'white',
            },
            {
              value: 5,
              color: 'color-05',
              label: '5',
              textColor: 'white',
            },
            {
              value: 6,
              color: 'color-06',
              label: '6',
              textColor: 'white',
            },
            {
              value: 7,
              color: 'color-07',
              label: '7',
              textColor: 'white',
            },
            {
              value: 8,
              color: 'color-08',
              label: '8',
              textColor: 'white',
            },
            {
              value: 9,
              color: 'color-09',
              label: '9',
              textColor: 'white',
            },
            {
              value: 10,
              color: 'color-10',
              label: '10',
              textColor: 'white',
            },
            {
              value: 11,
              color: 'color-11',
              label: '12',
              textColor: 'white',
            },
            {
              value: 12,
              color: 'color-12',
              label: '12',
              textColor: 'white',
            },
            {
              value: 13,
              color: 'color-01',
              label: '13',
              textColor: 'white',
            },
            {
              value: 14,
              color: 'color-02',
              label: '14',
              textColor: 'white',
            },
            {
              value: 15,
              color: 'color-03',
              label: '15',
              textColor: 'white',
            },
            {
              value: 16,
              color: 'color-04',
              label: '16',
              textColor: 'white',
            },
            {
              value: 17,
              color: 'color-05',
              label: '17',
              textColor: 'white',
            },
            {
              value: 18,
              color: 'color-06',
              label: '18',
              textColor: 'white',
            },
            {
              value: 19,
              color: 'color-07',
              label: '19',
              textColor: 'white',
            },
            {
              value: 20,
              color: 'color-08',
              label: '20',
              textColor: 'white',
            },
            {
              value: 21,
              color: 'color-09',
              label: '21',
              textColor: 'white',
            },
            {
              value: 22,
              color: 'color-10',
              label: '22',
              textColor: 'white',
            },
            {
              value: 23,
              color: 'color-11',
              label: '23',
              textColor: 'white',
            },
            {
              value: 24,
              color: 'color-12',
              label: '24',
              textColor: 'white',
            },
            {
              value: 25,
              color: 'color-01',
              label: '25',
              textColor: 'white',
            },
            {
              value: 26,
              color: 'color-02',
              label: '26',
              textColor: 'white',
            },
            {
              value: 27,
              color: 'color-03',
              label: '27',
              textColor: 'white',
            },
            {
              value: 28,
              color: 'color-04',
              label: '28',
              textColor: 'white',
            },
            {
              value: 29,
              color: 'color-05',
              label: '29',
              textColor: 'white',
            },
            {
              value: 30,
              color: 'color-06',
              label: '30',
              textColor: 'white',
            }
          ]
        },
        { property: 'value', label: 'Produto' },
        { property: 'label', label: 'Descrição' },
        { property: 'pai', label: 'Pai' },
        { property: 'UM', label: 'UM' }, 
        { property: 'quantidade', label: 'Quantidade', type: 'number' },
        { property: 'peso', label: 'Peso', type: 'number' },
        { property: 'custounit', type: 'currency', label: 'Custo Unitário' },
        { property: 'custototal', type: 'currency', label: 'Custo Total' }
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

    getPageOptions() {
      return {
        keepFilters: true
      };
    }
}
