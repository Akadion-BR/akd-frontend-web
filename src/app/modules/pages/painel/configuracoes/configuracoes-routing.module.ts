import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ViewComponent } from './view/view.component';
import { AlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { AlterarPlanoComponent } from './alterar-plano/alterar-plano.component';
import { AlterarFormaPagamentoComponent } from './alterar-forma-pagamento/alterar-forma-pagamento.component';

const routes: Routes = [
    {
        path: 'alterar-dados',
        component: AlterarDadosComponent
    },
    {
        path: 'alterar-plano',
        component: AlterarPlanoComponent
    },
    {
        path: 'alterar-forma-pagamento',
        component: AlterarFormaPagamentoComponent
    },
    {
        path: '**',
        redirectTo: '/painel/configuracoes/alterar-plano'
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfiguracoesRoutingModule { }