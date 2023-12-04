import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api-config';
import { Cpf } from 'src/app/modules/models/globals/cpf';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  private httpOptions = {
    params: new HttpParams({
    }),
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: null
  }

  public validaDuplicidadeCpf(cpf: Cpf) {
    return this.http.post(`${API_CONFIG.baseUrl}/api/site/v1/cliente-sistema/verifica-cpf`, cpf, this.httpOptions).pipe(
      catchError((erro: HttpErrorResponse) => {
        if (erro.status != 403 && erro.status != 0) return throwError(() => new Error((erro.error.error).toString().replace("Error:", "")));
        else if (erro.status == 403) return throwError(() => new Error('Ops! Ocorreu um erro de autenticação'));
        else return throwError(() => new Error(erro.message));
      })
    )
  }
}
