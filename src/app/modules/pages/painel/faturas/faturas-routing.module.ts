import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListagemComponent } from "./listagem/listagem.component";

const routes: Routes = [
    {
        path: '',
        component: ListagemComponent
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
export class FaturasRoutingModule { }