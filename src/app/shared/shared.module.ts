import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, NgForm } from '@angular/forms';
import { PoTableModule } from '@po-ui/ng-components';
export * from '@po-ui/ng-components'; 
import { HttpHeaders } from '@angular/common/http';
import { api } from '../model/api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    PoTableModule,
    RouterModule
  ],
  exports:[
    PoModule,
    PoTemplatesModule,
    FormsModule,
    NgForm,
    PoTableModule,
    
  ]
})
export class SharedModule {  
}
