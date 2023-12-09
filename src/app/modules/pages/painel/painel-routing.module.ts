import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ListagemComponent as ListagemEmpresas } from './empresas/listagem/listagem.component';
import { ListagemComponent as ListagemFaturas } from './faturas/listagem/listagem.component';

const routes: Routes = [
  {
    path: 'empresas',
    component: ListagemEmpresas,
    loadChildren: () => import('./empresas/empresas-routing.module').then(m => m.EmpresasRoutingModule)
  },
  {
    path: 'faturas',
    component: ListagemFaturas,
    loadChildren: () => import('./faturas/faturas-routing.module').then(m => m.FaturasRoutingModule)
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