import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturasComponent } from './faturas/faturas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ListagemComponent } from './empresas/listagem/listagem.component';

const routes: Routes = [
  {
    path: 'empresas',
    component: ListagemComponent,
    loadChildren: () => import('./empresas/empresas-routing.module').then(m => m.EmpresasRoutingModule)
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