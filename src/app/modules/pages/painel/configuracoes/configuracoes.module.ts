import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { DadosCadastraisComponent } from './alterar-dados/dados-cadastrais/dados-cadastrais.component';
import { DadosContatoComponent } from './alterar-dados/dados-contato/dados-contato.component';

@NgModule({
  declarations: [
    ViewComponent,
    DadosCadastraisComponent,
    DadosContatoComponent,
    AlterarDadosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule,
    RouterModule
  ]
})
export class ConfiguracoesModule { }
