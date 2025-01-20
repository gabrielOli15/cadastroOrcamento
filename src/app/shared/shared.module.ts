import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { PoTableModule } from '@po-ui/ng-components';
export * from '@po-ui/ng-components'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    PoTableModule
  ],
  exports:[
    PoModule,
    PoTemplatesModule,
    FormsModule,
    PoTableModule
  ]
})
export class SharedModule { }
