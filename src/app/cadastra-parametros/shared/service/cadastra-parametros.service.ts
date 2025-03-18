import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../../model/api';

const apiData: api = new api();

@Injectable({
  providedIn: 'root'
})
export class CadastraParametrosService {

  private apiUrl = apiData.URL + '/cardallapis/parametro';

  constructor(private http: HttpClient) {}

  saveParametro(parametro: any): Observable<any> {
    console.log(parametro);
    return this.http.post(this.apiUrl, parametro);
  }

  editParametro(parametro: any): Observable<any> {
    console.log('editParametro');
    console.log(parametro);
    return this.http.put(this.apiUrl + '/' + parametro.zx2_cod, parametro);
  }
}