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
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { EmpresasModule } from './empresas/empresas.module';
import { FaturasModule } from './faturas/faturas.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ViewComponent,
    RelatoriosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule, 
    FormsModule, 
    ReactiveFormsModule, 
    EmpresasModule, 
    FaturasModule, 
    ConfiguracoesModule
  ]
})
export class PainelModule { }
