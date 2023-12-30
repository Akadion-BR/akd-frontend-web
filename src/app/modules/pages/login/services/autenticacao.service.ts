import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/modules/models/globals/LoginRequest';
import { Util } from 'src/app/modules/utils/Util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  jwtService: JwtHelperService = new JwtHelperService();

  httpOptionsLogin = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  private apiUrl = environment.apiUrl;

  formLogin: FormGroup;

  constructor(private httpClient: HttpClient) {
    this.formLogin = new FormGroup(
      {
        cpf: new FormControl(['122.188.264-37']),
        senha: new FormControl(['123'])
      }
    )
  }

  public realizaLogin(cpf: string, senha: string): Observable<any> {
    return this.httpClient.post<LoginRequest>(`${this.apiUrl}/login`, { cpf, senha }, this.httpOptionsLogin).pipe(
      catchError((error: any) => {
        return throwError(() => new HttpErrorResponse(error));
      }),
    )
  }

  successfullLogin(authToken: string) {
    localStorage.setItem('Authorization', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('Authorization');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string {
    let token: string | null = localStorage.getItem('Authorization');
    if (token != null) {
      return token.replaceAll('"', '');
    }
    return '';
  }

  encerrarSessao() {
    localStorage.clear();
  }
}
