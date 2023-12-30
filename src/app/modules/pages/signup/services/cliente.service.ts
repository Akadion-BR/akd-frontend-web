import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api-config';
import { Cpf } from 'src/app/modules/models/globals/cpf';
import { CriacaoClienteRequest } from 'src/app/modules/models/cliente/request/criacao/CriacaoClienteRequest';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient) { }

  private httpOptions = {
    params: new HttpParams({
    }),
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: null
  }

  public validaDuplicidadeCpf(cpf: Cpf) {
    return this.http.post(`${API_CONFIG.baseUrl}/cliente-sistema/verifica-cpf`, cpf, this.httpOptions);
  }

  public novoCliente(clienteRequest: CriacaoClienteRequest): Observable<string> {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/cliente-sistema`, clienteRequest, this.httpOptions)
  }

}
