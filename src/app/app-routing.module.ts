import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ViewComponent } from './modules/pages/painel/view/view.component';
import { MinhasEmpresasComponent } from './modules/pages/painel/minhas-empresas/minhas-empresas.component';


const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./modules/pages/signup/signup-routing.module').then(m => m.SignupRoutingModule)
  },
  {
    path: 'empresas',
    component: ViewComponent,
    loadChildren: () => import('./modules/pages/painel/painel-routing.module').then(m => m.PainelRoutingModule)
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/pages/home/home-routing.module').then(m => m.HomeRoutingModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
