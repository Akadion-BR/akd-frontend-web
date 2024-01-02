import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacaoService } from '../modules/pages/login/services/autenticacao.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private autenticacaoService: AutenticacaoService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            this._snackBar.open('Ocorreu um erro interno na aplicação. Favor entrar em contato com o suporte', "Fechar", {
              duration: 15000
            });
            return throwError(() => new Error(error.error));
          }
          else {
            switch (error.status) {
              case 401 | 403:
                if (this.router.url == '/login') {
                  this.autenticacaoService.formLogin.reset();
                  this._snackBar.open('Ocorreu um erro durante a sua tentativa de login. Tente novamente!', 'Fechar', {
                    duration: 3500
                  })
                }
                else {
                  localStorage.clear();
                  this.router.navigate(['login']);
                  this._snackBar.open('É necessário realizar o login para acessar as funcionalidades do sistema', 'fechar', {
                    duration: 3500
                  })
                }
                break;
              case 400:
                this._snackBar.open(error.error.error, "Fechar", {
                  duration: 15000
                });
                break;
              case 404:
                this._snackBar.open('Ocorreu um erro interno na aplicação. Favor entrar em contato com o suporte', "Fechar", {
                  duration: 15000
                });
                break;
              case 500:
                this._snackBar.open(error.error.error, "Fechar", {
                  duration: 15000
                });
                break;
              default:
                this._snackBar.open('Ocorreu um erro interno na aplicação. Favor entrar em contato com o suporte', "Fechar", {
                  duration: 15000
                });
                break;
            }
            return throwError(() => new Error(error.error.error));
          }
        }
        else {
          console.log('Ocorreu um erro: ', error);
          this._snackBar.open('Ocorreu um erro interno na aplicação. Favor entrar em contato com o suporte', "Fechar", {
            duration: 15000
          });
          return throwError(() => new Error(error.error));
        }
      })
    );
  }
}
