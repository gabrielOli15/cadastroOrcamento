import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

import { RouterModule } from '@angular/router';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http';
import { PoStorageService, PoStorageModule } from '@po-ui/ng-storage';
import { PathLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common'; 
import { LoginService } from './login/shared/service/login.service';
import { AuthGuardService } from './login/shared/service/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]), 
    ToolbarModule,
    HttpClientModule,
    ProtheusLibCoreModule,
    PoStorageModule.forRoot({
      name: 'appconference',
      storeName: 'mystore',
      driverOrder: ['localstorage']
    }),
    BrowserAnimationsModule,
    PoModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    LoginService,
    AuthGuardService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
  exports: [
    PoStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
