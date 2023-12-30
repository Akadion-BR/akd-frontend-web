import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../modules/pages/login/services/autenticacao.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private autenticacaoService: AutenticacaoService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.autenticacaoService.isAuthenticated()) {
      const token = this.autenticacaoService.getToken();

      request = request.clone({
        setHeaders: {
          'Authorization': token,
          'Canal': 'Front-end'
        }
      });
    }

    return next.handle(request);
  }

}
