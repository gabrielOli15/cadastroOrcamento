import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage'; 
import { api } from '../../../model/api';

const apiData: api = new api();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  path = 'auth';
  ApiRest = apiData.URL + '/cardallapis/login?';

  constructor(
    private http: HttpClient,
    private storage: PoStorageService  
  ) {}

  //Método responsável por buscar e listar nossos fornecedores
  getLogin(user: string, password: string): Observable<any> {
    return this.http.get(this.ApiRest + 'user='+user+'&password='+password); 
  }

  async isLoggedIn(): Promise<Date> {   
    return this.storage.get('loggedIn').then( value => value)
  }
}
