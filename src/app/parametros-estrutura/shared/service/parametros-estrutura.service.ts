import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../../model/api';
import { Observable } from 'rxjs';

const apiData: api = new api();

@Injectable({
  providedIn: 'root'
})
export class ParametrosEstruturaService {

  constructor(public http: HttpClient) {}
  
  private serviceApi = apiData.URL + '/cardallapis/parametro';

  getParametros() {
    return this.http.get(apiData.URL + '/cardallapis/ZX2/ZX2_COD?pagesize=1000');
  }

  getParametro(codigo: string) {
    return this.http.get(apiData.URL + '/cardallapis/ZX2/ZX2_COD/' + codigo);
  }

  editParametro(parametro: any): Observable<any> {
    console.log(parametro);
    return this.http.put(this.serviceApi + '/' + parametro.zx2_cod, parametro);
  }

  deleteParametro(parametro: any): Observable<any> {
    console.log(parametro);
    return this.http.delete(this.serviceApi + '/' + parametro.zx2_cod, parametro);
  }

  downloadCsv(endpoint: any) {
    this.http.get(endpoint).subscribe((data: any) => {
      const csvStr = this.parseJsonToCsv(data['items']);
      const dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

      const exportFileDefaultName = 'data.csv';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    });
  }

  parseJsonToCsv(jsonData = []) {
    if (!jsonData.length) {
      return '';
    }

    const keys = Object.keys(jsonData[0]);
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const csvColumnHeader = keys.join(columnDelimiter);

    const csvStr = jsonData.reduce((accCsvStr, currentItem) => {
      keys.forEach((key, index) => {
        if (index && index < keys.length - 1) {
          accCsvStr += columnDelimiter;
        }

        accCsvStr += currentItem[key];
      });

      return accCsvStr + lineDelimiter;
    }, csvColumnHeader + lineDelimiter);

    return encodeURIComponent(csvStr);
  }
}
