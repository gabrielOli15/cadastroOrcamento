import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoTableColumn } from '@po-ui/ng-components';


@Injectable({
  providedIn: 'root'
})
export class EstruturaOrcamentoService {

  filter(filters) {
    let filteredItems = [...this.getItems()];

    Object.keys(filters).forEach(filter => {
      filteredItems = filteredItems.filter(register => {
        if (typeof register[filter] === 'string') {
          return register[filter].toLocaleLowerCase().includes(filters[filter].toLocaleLowerCase());
        } else {
          return register[filter] === filters[filter];
        }
      });
    });

    return filteredItems;
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'status',
        label: ' ',
        type: 'subtitle',
        subtitles: [
          { value: '1', color: 'success', label: 'Disponível', content: '' },
          { value: '2', color: 'danger', label: 'Bloqueado', content: '' }
        ]
      },
      { property: 'codigo', label: 'Código' },
      { property: 'descricao', label: 'Descrição' },
      { property: 'estrutura', label: 'Estrutura' },
      { property: 'tipo', label: 'Tipo' },
      { property: 'revisao', label: 'Revisão' },
      { property: 'data', label: 'Data', type: 'date' },
      { property: 'usuario', label: 'Usuário' },
      { property: 'peso', label: 'Peso Total' },
      { property: 'horas', label: 'Horas Totais' },
      { property: 'valor', label: 'Valor Total' },
    ];
  }

  getHireStatus() {
    return [
      { value: '1', label: 'Disponível' },
      { value: '2', label: 'Bloqueado' }
    ];
  }

  getItems() {
    return [
      {
        status: '1',
        codigo: 'EP0001',
        descricao: 'Descrição 1',
        estrutura: 'Padrão',
        tipo: 'Tipo 1',
        revisao: '1',
        data: '24/01/2025',
        usuario: 'Teste',
        peso: 1200,
        horas: 500,
        valor: 1000,
      },
      {
        status: '2',
        codigo: 'EE0001',
        estrutura: 'Especial',
        descricao: 'Descrição 1',
        tipo: 'Estrutura Livre',
        revisao: '1',
        data: '24/01/2025',
        usuario: 'Teste',
        peso: 1200,
        horas: 500,
        valor: 1000,
      }
    ];
  }

  getJobs() {
    return [
      { value: 'abc', label: 'Systems Analyst' },
      { value: 'def', label: 'Trainee' },
      { value: 'ghi', label: 'Programmer' },
      { value: 'jkl', label: 'Web developer' },
      { value: 'mno', label: 'Recruiter' },
      { value: 'pqr', label: 'Consultant' },
      { value: 'stu', label: 'DBA' }
    ];
  }

  resetFilterHiringProcess() {
    return [...this.getItems()];
  }

  getPageOptions() {
    return {
      keepFilters: true
    };
  }
}
