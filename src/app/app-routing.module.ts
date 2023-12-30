import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ViewComponent } from './modules/pages/painel/view/view.component';
import { LoginComponent } from './modules/pages/login/login/login.component';
import { ClienteSistemicoGuard } from './auth/ClienteSistemico.guard';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./modules/pages/signup/signup-routing.module').then(m => m.SignupRoutingModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'painel',
    component: ViewComponent,
    canActivate: [ClienteSistemicoGuard],
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
