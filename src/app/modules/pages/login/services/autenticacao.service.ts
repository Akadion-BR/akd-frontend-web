import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/modules/models/globals/LoginRequest';
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

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.formLogin = new FormGroup(
      {
        cpf: new FormControl(['122.188.264-37']),
        senha: new FormControl(['123'])
      }
    )
  }

  public realizaLogin(cpf: string, senha: string): Observable<any> {
    return this.httpClient.post<LoginRequest>(`${this.apiUrl}/login`, { cpf, senha }, this.httpOptionsLogin);
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
    this.router.navigateByUrl('/login');
    this.snackBar.open('Logout realizado com sucesso', "Fechar", {
      duration: 3500
    });
  }
}
