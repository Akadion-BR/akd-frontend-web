import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    {
        path: '',
        component: ViewComponent
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
export class RelatorioRoutingModule { }