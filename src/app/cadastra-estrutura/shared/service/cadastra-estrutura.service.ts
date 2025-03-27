import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn, PoTableColumnLabel } from '@po-ui/ng-components';
import { api } from '../../../model/api';

const apiData: api = new api();

@Injectable({
  providedIn: 'root'
})
export class CadastraEstruturaService {

  private serviceApi = apiData.URL + '/cardallapis';

  constructor(public http: HttpClient) {}

  getColumnsBusca(): Array<PoTableColumn> {
    return [

      { property: 'value', label: 'Produto' },
      { property: 'label', label: 'Descrição' },
      { property: 'UM', label: 'UM' } 
    ];
  }
  
  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'estrutura',
        type: 'label',
        label: 'Estrutura',
        width: '5%',
        labels: <Array<PoTableColumnLabel>>[
          { value: 1, color: 'color-01', label: '1', textColor: 'white' },
          { value: 2, color: 'color-02', label: '2', textColor: 'white' },
          { value: 3, color: 'color-03', label: '3', textColor: 'white' },
          { value: 4, color: 'color-04', label: '4', textColor: 'white' },
          { value: 5, color: 'color-05', label: '5', textColor: 'white' },
          { value: 6, color: 'color-06', label: '6', textColor: 'white' },
          { value: 7, color: 'color-07', label: '7', textColor: 'white' },
          { value: 8, color: 'color-08', label: '8', textColor: 'white' },
          { value: 9, color: 'color-09', label: '9', textColor: 'white' },
          { value: 10, color: 'color-10', label: '10', textColor: 'white' },
          { value: 11, color: 'color-11', label: '11', textColor: 'white' },
          { value: 12, color: 'color-12', label: '12', textColor: 'white' },
          { value: 13, color: 'color-01', label: '13', textColor: 'white' },
          { value: 14, color: 'color-02', label: '14', textColor: 'white' },
          { value: 15, color: 'color-03', label: '15', textColor: 'white' },
          { value: 16, color: 'color-04', label: '16', textColor: 'white' },
          { value: 17, color: 'color-05', label: '17', textColor: 'white' },
          { value: 18, color: 'color-06', label: '18', textColor: 'white' },
          { value: 19, color: 'color-07', label: '19', textColor: 'white' },
          { value: 20, color: 'color-08', label: '20', textColor: 'white' },
          { value: 21, color: 'color-09', label: '21', textColor: 'white' },
          { value: 22, color: 'color-10', label: '22', textColor: 'white' },
          { value: 23, color: 'color-11', label: '23', textColor: 'white' },
          { value: 24, color: 'color-12', label: '24', textColor: 'white' },
          { value: 25, color: 'color-01', label: '25', textColor: 'white' },
          { value: 26, color: 'color-02', label: '26', textColor: 'white' },
          { value: 27, color: 'color-03', label: '27', textColor: 'white' },
          { value: 28, color: 'color-04', label: '28', textColor: 'white' },
          { value: 29, color: 'color-05', label: '29', textColor: 'white' },
          { value: 30, color: 'color-06', label: '30', textColor: 'white' }
        ]
      },
      { property: 'value', label: 'Produto' },
      { property: 'label', label: 'Descrição' },
      { property: 'pai', label: 'Pai' },
      { property: 'UM', label: 'UM' }, 
      { property: 'quantidade', label: 'Quantidade', type: 'number' },
      { property: 'peso', label: 'Peso', type: 'number' },
      { property: 'custounit', type: 'currency', label: 'Custo Unitário', format: 'BRL' },
      { property: 'custototal', type: 'currency', label: 'Custo Total', format: 'BRL' }
    ];
  }

  getPageOptions() {
    return {
      keepFilters: true
    };
  }

  getProdutos(filtro: any) {
    return this.http.get(this.serviceApi + '/produtos?filter=' + filtro);
  }

  getModObra(codModObra: any) {
    return this.http.get(this.serviceApi + '/modobra/' + codModObra);
  }

  getKitTinta(codKitTinta: any) {
    return this.http.get(this.serviceApi + '/kittinta/' + codKitTinta);
  }
}
