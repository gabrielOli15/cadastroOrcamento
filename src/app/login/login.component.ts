import { Component } from '@angular/core';
import { PoLanguage, PoNotification, PoNotificationService, SharedModule } from '../shared/shared.module';
import { LoginService } from './shared/service/login.service';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário',
    loginHint: 'O seu usuário é o mesmo de acesso ao TOTVS Protheus'

  };

  language: Array<PoLanguage> = [];
  hideRememberUser: boolean = true;    
  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: PoStorageService,
    private poNotification: PoNotificationService
  ) { } 

  loginSubmit(formData: PoPageLogin) {
    const user = Object.assign({ username: formData.login, password: formData.password }); 

    this.loginService.getLogin(formData.login, formData.password).subscribe(response => {
      if (response.ret) {      
        
        let expires = new Date(); 
        expires.setDate(expires.getDate()+1); 

        //this.storage.set('fornecedor', { codigo: response[0].codForn, loja: response[0].lojaForn }); 
        this.storage.set('loggedIn', expires).then(() => { 
          this.router.navigate(['/']);
        });
      } else {
        const poNotification: PoNotification = {
          message: 'e-mail ou senha inválidos, tente novamente.',
          orientation: undefined,
          action: undefined,
          actionLabel: '',
          duration: 5000
        };
        this.poNotification.error(poNotification);
      } 
    })
  }
}
