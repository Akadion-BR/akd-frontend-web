import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DadosCadastraisComponent } from './view/dados-cadastrais/dados-cadastrais.component';
import { DadosContatoComponent } from './view/dados-contato/dados-contato.component';
import { DadosPlanoComponent } from './view/dados-plano/dados-plano.component';

@NgModule({
  exports: [
    ViewComponent
  ],
  declarations: [
    ViewComponent,
    DadosCadastraisComponent,
    DadosContatoComponent,
    DadosPlanoComponent
  ],
  imports: [
    CommonModule,
    AppModule,
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule
  ]
})
export class SignupModule { }
