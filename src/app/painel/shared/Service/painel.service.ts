import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  constructor(public http: HttpClient) {}

  getColumns(): Array<PoTableColumn> {
    const airfareDetail: PoTableDetail = {
      columns: [
        { property: 'versao', label: 'Versão' },
        { property: 'responsavel', label: 'Responsável'},
        { property: 'data', label: 'Data', type: 'date' },
        { property: 'hora', label: 'Hora', type: 'time', format: 'HH:mm' },
        { property: 'justificativa', label: 'Justificativa', type: 'string' }
      ],
      typeHeader: 'top'
    };

    return [
      {
        property: 'projeto',
        type: 'label',
        labels: [ 
          { value: '1', label: 'Projeto 1', color: 'color-01' },
          { value: '2', label: 'Projeto 2', color: 'color-02' },
          { value: '3', label: 'Projeto 3', color: 'color-03' },
          { value: '4', label: 'Projeto 4', color: 'color-04' },
          { value: '5', label: 'Projeto 5', color: 'color-05' },
          { value: '6', label: 'Projeto 6', color: 'color-06' },
          { value: '7', label: 'Projeto 7', color: 'color-07' } 
        ]
      }, 
      { property: 'cliente' },
      { property: 'titulo' }, 
      { property: 'date', label: 'Emissão', type: 'date' },
      { property: 'returnDate', label: 'Prazo', type: 'date' },
      { property: 'value', type: 'currency', label: 'Valor' },
      { property: 'detail', label: 'Details', type: 'detail', detail: airfareDetail }
    ];
  }

  getItems() {
    return [
      {
        id: 11234,
        initials: 'BR',
        cliente: 'LIPCEL SEGURANCA DIGITAL INTEGRADA LTDA.',
        value: 1000.0,
        date: '2018-10-09',
        returnDate: '2018-11-01',
        class: 'Economic',
        onBoardService: false,
        titulo: '00000001',
        airline: 'Azul',
        projeto: '5',
        region: 'Latin America',
        detail: [
          {
            versao: '1',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '20:10:10',
            justificativa: 'Ajuste valores'
          },
          {
            versao: '2',
            responsavel: 'Maria',
            data: '06/10/2024',
            hora: '09:15:19',
            justificativa: 'Reajuste'
          },
          {
            versao: '3',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '07:10:20',
            justificativa: 'Valor tintas'
          }
        ]
      },
      {
        id: 22467,
        initials: 'FR',
        cliente: 'CRAVEIRO E SILVA ELETRO ELETRONICA LTDA',
        value: 5000.0,
        date: '2019-12-13',
        returnDate: '2019-12-31',
        class: 'Economic',
        onBoardService: false,
        titulo: '00000002',
        airline: 'British Airways',
        projeto: '5',
        region: 'Alps',
        detail: [
          {
            versao: '1',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '10:15:10',
            justificativa: 'Reajuste'
          },
          {
            versao: '2',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '22:15:10',
            justificativa: 'Reajuste'
          },
          {
            versao: '3',
            responsavel: 'Maria',
            data: '06/10/2024',
            hora: '10:15:10',
            justificativa: 'Reajuste'
          }
        ]
      },
      {
        id: 40670,
        initials: 'SN',
        cliente: 'HSBC BANK BRASIL SA BANCO MULTIPLO',
        value: 3200.0,
        date: '2017-11-22',
        returnDate: '2018-12-01',
        class: 'Economic',
        onBoardService: false,
        titulo: '00000003',
        airline: 'Iberia',
        projeto: '5',
        region: 'Western Africa'
      },
      {
        id: 34679,
        initials: 'PT',
        cliente: 'BACK COM. EQUIPAMENTOS ELETRÔNICOS LTDA',
        value: 5500.0,
        date: '2017-10-10',
        returnDate: '2018-10-20',
        class: 'Economic',
        onBoardService: false,
        titulo: '00000004',
        airline: 'Air Europa',
        projeto: '4',
        region: 'Mediterranean'
      },
      {
        id: 48999,
        initials: 'RU',
        cliente: 'PPCR TECNOLOGIA EM SISTEMAS DE SEGURANCA',
        value: 6700.0,
        date: '2019-01-17',
        returnDate: '2019-02-20',
        class: 'First Class',
        onBoardService: true,
        titulo: '00000005',
        airline: 'Lufthansa',
        projeto: '2',
        region: 'Caucasus'
      },
      {
        id: 48999,
        initials: 'US',
        cliente: 'MICROSET MAQUINAS E SERVICOS LTDA',
        value: 2700.49,
        date: '2018-10-17',
        returnDate: '2018-10-29',
        class: 'Economic',
        onBoardService: false,
        titulo: '00000006',
        airline: 'American Airlines',
        projeto: '2',
        region: 'North America'
      },
      {
        id: 54563,
        initials: 'CL',
        cliente: 'DANDOLINI SEGURANCA LTDA',
        value: 2000.0,
        date: '2018-10-20',
        returnDate: '2018-11-01',
        titulo: '00000007',
        class: 'Economic',
        onBoardService: false,
        airline: 'LATAM',
        projeto: '1',
        region: 'Latin America'
      },
      {
        id: 64568,
        initials: 'MX',
        cliente: 'STOMP COMERCIO DE ELETROELETRONICOS LTDA',
        value: 2100.0,
        date: '2018-03-10',
        returnDate: '2018-05-09',
        titulo: '00000008',
        class: 'Economic',
        onBoardService: false,
        airline: 'Aero México',
        projeto: '1',
        region: 'Latin America',
        detail: [
          {
            versao: '1',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '12:10:10',
            justificativa: 'Reajuste'
          },
          {
            versao: '2',
            responsavel: 'João',
            data: '06/10/2024',
            hora: '11:10:10',
            justificativa: 'Reajuste'
          },
          {
            versao: '3',
            responsavel: 'Maria',
            data: '06/10/2024',
            hora: '16:10:10',
            justificativa: 'Reajuste'
          }
        ]
      },
      {
        id: 75456,
        initials: 'IE',
        cliente: 'IBCE SISTEMAS DE SEGURANCA ELETRONICA',
        value: 16300.0,
        date: '2018-10-14',
        returnDate: '2018-10-30',
        titulo: '00000009',
        class: 'First Class',
        onBoardService: true,
        airline: 'Lufthansa',
        projeto: '2',
        region: 'British Isle'
      },
      {
        id: 23445,
        initials: 'ZA',
        cliente: 'REPAM EQUIPAMENTOS DE SEGURANCA LTDA',
        value: 11900.0,
        date: '2018-12-10',
        returnDate: '2018-12-25',
        titulo: '00000010',
        class: 'Economic',
        onBoardService: false,
        airline: 'South African Airways',
        projeto: '1',
        region: 'Southern Africa'
      },
      {
        id: 19238,
        initials: 'AU',
        cliente: 'HI TEC ELETRONICA EIRELI - ME',
        value: 16300.0,
        date: '2018-10-14',
        returnDate: '2018-10-30',
        titulo: '00000011',
        class: 'First Class',
        onBoardService: true,
        airline: 'Jetstar Airways',
        projeto: '2',
        region: 'Australasia'
      },
      {
        id: 85456,
        initials: 'JP',
        cliente: 'ANDRE FERRARO CHAGAS ME',
        value: 15900.0,
        date: '2018-10-25',
        returnDate: '2018-11-10',
        titulo: '00000012',
        class: 'Executive',
        onBoardService: true,
        airline: 'Japan Airlines',
        projeto: '1',
        region: 'East Asia'
      },
      {
        id: 94565,
        initials: 'CN',
        cliente: 'JEAN CARLO MELLO ­ ME',
        value: 2900.0,
        date: '2018-10-10',
        returnDate: '2018-10-25',
        titulo: '00000013',
        class: 'Economic',
        onBoardService: false,
        airline: 'Malaysia Airlines',
        projeto: '1',
        region: 'East Asia'
      },
      {
        id: 32330,
        initials: 'UK',
        cliente: 'ENGETEL COMERCIO DE PRODUTOS ELETRO ELET',
        value: 2090.5,
        date: '2018-10-07',
        returnDate: '2018-11-15',
        titulo: '00000014',
        class: 'Executive',
        onBoardService: true,
        airline: 'British Airways',
        projeto: '3',
        region: 'British Isle'
      },
      {
        id: 14560,
        initials: 'CA',
        cliente: 'KABRAN ELETRODOMESTICOS LTDA.',
        value: 2090.5,
        date: '2018-10-07',
        returnDate: '2018-10-20',
        titulo: '00000015',
        class: 'Economic',
        onBoardService: false,
        airline: 'American Airlines',
        projeto: '3',
        region: 'North America'
      },
      {
        id: 93800,
        initials: 'IS',
        cliente: 'VISTA COM. E INST. DE EQUIP. DE SEGURANC',
        value: 6300.0,
        date: '2018-10-12',
        returnDate: '2018-10-27',
        titulo: '00000016',
        class: 'Economic',
        onBoardService: false,
        airline: 'Star Alliance',
        projeto: '1',
        region: 'Nordics'
      },
      {
        id: 34239,
        initials: 'DE',
        cliente: 'TELESYSTEM TELEINFORMATICA LTDA  ',
        value: 3070.5,
        date: '2018-10-07',
        returnDate: '2018-10-20',
        titulo: '00000017',
        class: 'Executive',
        onBoardService: true,
        airline: 'LATAM',
        projeto: '6',
        region: 'Danube'
      },
      {
        id: 45611,
        initials: 'AR',
        cliente: 'DESTAK SISTEMAS DE SEURANCA LTDA',
        value: 3500.5,
        date: '2018-12-07',
        returnDate: '2018-12-29',
        titulo: '00000018',
        class: 'Economic',
        onBoardService: false,
        airline: 'LATAM',
        projeto: '7',
        region: 'Latin America'
      }
    ];
  }
}
