import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/pages/home/home-routing.module').then(m => m.HomeRoutingModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./modules/pages/signup/signup-routing.module').then(m => m.SignupRoutingModule)
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
