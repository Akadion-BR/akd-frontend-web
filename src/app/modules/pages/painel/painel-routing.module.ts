import { RelatorioRoutingModule } from './relatorios/relatorio-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent as ListagemEmpresas } from './empresas/listagem/listagem.component';
import { ListagemComponent as ListagemFaturas } from './faturas/listagem/listagem.component';
import { ViewComponent as ConfiguracoesViewComponent} from './configuracoes/view/view.component';
import { ViewComponent as RelatoriosViewComponent } from './relatorios/view/view.component';

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
    component: RelatoriosViewComponent,
    loadChildren: () => import('./relatorios/relatorio-routing.module').then(m => m.RelatorioRoutingModule)
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesViewComponent,
    loadChildren: () => import('./configuracoes/configuracoes-routing.module').then(m => m.ConfiguracoesRoutingModule)
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