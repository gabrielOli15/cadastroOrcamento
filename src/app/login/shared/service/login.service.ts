import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage'; 
import { api } from '../../../model/api';

const apiData: api = new api();
const headers = new HttpHeaders() 
      .append('Content-Type','application/json')
      .append('Authorization','Basic ' + btoa(apiData.USER));

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //extends GenericService<User> 
  path = 'auth';
  ApiRest = apiData.URL + '/gts_pflogin/get?'; //Endereço da nossa API responsável por lista os fornecedores

  constructor(
    private http: HttpClient,
    private storage: PoStorageService  
  ) {}

  //Método responsável por buscar e listar nossos fornecedores
  getLogin(cemail: string, csenha: string): Observable<any> {
    return of({ret: true, codForn: 'teste', lojaForn: 'teste'});  //this.http.get(this.ApiRest + 'cemail='+cemail+'&csenha='+csenha,{headers: headers});
  }

  async isLoggedIn(): Promise<Date> {   
    this.storage.get('loggedIn').then( value => console.log(new Date(value)))
    return this.storage.get('loggedIn').then( value => value)
  }
}
