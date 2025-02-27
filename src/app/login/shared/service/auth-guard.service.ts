import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuardService.canActivate')
    let lCheckLogin
    lCheckLogin = this.checkLogin();
    return lCheckLogin
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuardService.canActivateChild')
    let lCheckLogin
    lCheckLogin = this.checkLogin();
    return lCheckLogin
  }

  async checkLogin() {
    console.log('AuthGuardService.checkLogin')
    let lCheckLogin 
    let today = new Date()
    lCheckLogin = await this.loginService.isLoggedIn().then(
      (loggedIn: any) => new Date(loggedIn) < today ? this.router.navigate(['/login']) : true 
    );

    return lCheckLogin
  }

}
