import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaturasComponent } from './faturas/faturas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { EmpresasModule } from './empresas/empresas.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ViewComponent,
    FaturasComponent,
    RelatoriosComponent,
    ConfiguracoesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule, 
    FormsModule, 
    ReactiveFormsModule, 
    EmpresasModule
  ]
})
export class PainelModule { }
