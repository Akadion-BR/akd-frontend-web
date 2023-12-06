import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MinhasEmpresasComponent } from './minhas-empresas/minhas-empresas.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MinhasEmpresasComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatIconModule
  ]
})
export class PainelModule { }
