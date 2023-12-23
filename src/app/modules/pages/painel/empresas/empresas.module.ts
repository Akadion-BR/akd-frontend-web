import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ViewComponent } from './view/view.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DadosCadastraisComponent } from './cadastro/dados-cadastrais/dados-cadastrais.component';
import { DadosFiscaisComponent } from './cadastro/dados-fiscais/dados-fiscais.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    ViewComponent,
    DetalhesComponent,
    EditarComponent,
    DadosCadastraisComponent,
    DadosFiscaisComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ]
})
export class EmpresasModule { }
