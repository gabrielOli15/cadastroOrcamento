import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module'; 
import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from "./painel.component";

@NgModule({
  declarations: [
    PainelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PainelRoutingModule
  ]
})
export class PainelModule { }
