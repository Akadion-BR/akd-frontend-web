import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';



@NgModule({
  declarations: [
    ListagemComponent
  ],
  imports: [
    CommonModule, 
    MatIconModule, 
    FormsModule, 
    ReactiveFormsModule, 
    SharedModule
  ]
})
export class FaturasModule { }
