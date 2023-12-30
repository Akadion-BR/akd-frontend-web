import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacaoService } from '../modules/pages/login/services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteSistemicoGuard implements CanActivate {

  constructor(private authService: AutenticacaoService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authenticated = this.authService.isAuthenticated();

    if (authenticated) return true;
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
