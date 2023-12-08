import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasEmpresasComponent } from './minhas-empresas/minhas-empresas.component';
import { FaturasComponent } from './faturas/faturas.component';
import { ViewComponent } from './view/view.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

const routes: Routes = [
  {
    path: 'empresas',
    component: MinhasEmpresasComponent
  },
  {
    path: 'faturas',
    component: FaturasComponent
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent
  },
  {
    path: '**',
    redirectTo: '/painel/empresas'
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelRoutingModule { }
