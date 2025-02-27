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

  path = 'auth';
  ApiRest = apiData.URL + '/cardallapis/login?';

  constructor(
    private http: HttpClient,
    private storage: PoStorageService  
  ) {}

  //Método responsável por buscar e listar nossos fornecedores
  getLogin(user: string, password: string): Observable<any> {
    console.log("getLogin")
    console.log(this.ApiRest)
    console.log(user)
    console.log(password)
    console.log(headers)
    return this.http.get(this.ApiRest + 'user='+user+'&password='+password,{headers: headers}); 
  }

  async isLoggedIn(): Promise<Date> {   
    return this.storage.get('loggedIn').then( value => value)
  }
}
