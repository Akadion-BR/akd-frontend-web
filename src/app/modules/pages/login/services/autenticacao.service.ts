import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
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

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.formLogin = this.formBuilder.group({
      cpf: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
        Validators.maxLength(14)
      ]],
      senha: ['', [
        Validators.required,
        Validators.maxLength(25),
      ]],
    })
  }

  public getFormValue(atributo: string): any {
    if (Util.isObjectEmpty(this.formLogin)) return null;
    return this.formLogin.controls[atributo].value;
  }

  public setFormValue(atributo: string, valor: any) {
    this.formLogin.controls[atributo].setValue(valor);
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
