import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListagemComponent } from "./listagem/listagem.component";
import { CadastroComponent } from './cadastro/cadastro.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: ListagemComponent
    },
    {
        path: 'criar',
        component: CadastroComponent
    },
    {
        path: ':id',
        component: DetalhesComponent
    },
    {
        path: 'editar/:id',
        component: EditarComponent
    },
    {
        path: '**',
        redirectTo: ''
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmpresasRoutingModule { }