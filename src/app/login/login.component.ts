import { Component } from '@angular/core';
import { PoLanguage, PoNotification, PoNotificationService, SharedModule } from '../shared/shared.module';
import { LoginService } from './shared/service/login.service';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { Router } from '@angular/router';

@Component({
    imports: [SharedModule],
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário',
    loginHint: 'O seu usuário é foi definido pelo administrador do Protheus'

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
    console.log("loginSubmit")
    this.loginService.getLogin(formData.login, formData.password).subscribe(response => {
      if (response.nome) {      

        // valida bloqueado
        if (response.bloqueado == '1') {
          const poNotification: PoNotification = {
            message: 'usuário bloqueado, contate o administrador.',
            orientation: undefined,
            action: undefined,
            actionLabel: '',
            duration: 5000
          };
          this.poNotification.error(poNotification);
          return;
        }
        
        let expires = new Date(); 
        expires.setDate(expires.getDate()+1); 

        this.storage.set('usuario', { nome: response.nome, perfil: response.perfil }); 
        this.storage.set('loggedIn', expires).then(() => { 
          this.router.navigate(['/']);
        });
      } else {
        const poNotification: PoNotification = {
          message: 'usuario ou senha inválidos, contate o administrador.',
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
