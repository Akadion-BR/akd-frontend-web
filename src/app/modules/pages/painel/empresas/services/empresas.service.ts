import { PageSettings } from './../../../../models/globals/PageSettings';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError, map, retry, catchError } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api-config';
import { EmpresaPageResponse } from 'src/app/modules/models/empresa/response/EmpresaPageResponse';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  private httpOptions = {
    params: new HttpParams({
    }),
    headers: new HttpHeaders({
      'Authorization': API_CONFIG.authorization
    }),
    body: null
  }

  public getEmpresas(valorBusca: string, empresasAtivas: string, pageSettings: PageSettings | null): Observable<EmpresaPageResponse> {
    this.httpOptions.params = new HttpParams();
    this.httpOptions.body = null;
    this.buildRequestParams(valorBusca, empresasAtivas);
    this.buildPageableParams(pageSettings);
    return this.http.get<EmpresaPageResponse>(`${API_CONFIG.baseUrl}/empresa`, this.httpOptions).pipe(
      map((resposta: any) => new EmpresaPageResponse(resposta)),
      catchError((error: HttpErrorResponse) => {
        this.implementaLogicaDeCapturaDeErroNaListagemDeItens(error);
        console.log(error);
        return throwError(() => new HttpErrorResponse(error.error));
      }),
      retry({ count: 20, delay: 10000 })
    )
  }

  private buildRequestParams(busca: string, empresasAtivas: string) {
    if (busca != null)
      this.httpOptions.params = this.httpOptions.params.set('busca', busca);
    if (empresasAtivas != null)
      this.httpOptions.params = this.httpOptions.params.set('ativas', empresasAtivas);
  }

  private buildPageableParams(pageSettings: PageSettings | null) {
    if (pageSettings != null) {
      this.httpOptions.params = this.httpOptions.params.set('page', pageSettings.pageNumber);
    }
    else {
      this.httpOptions.params = this.httpOptions.params.set('page', 0);
    }

    this.httpOptions.params = this.httpOptions.params.set('size', 1);
    this.httpOptions.params = this.httpOptions.params.set('sort', 'dataCadastro,DESC');
    this.httpOptions.params = this.httpOptions.params.append('sort', 'horaCadastro,DESC');
  }

  private implementaLogicaDeCapturaDeErroNaListagemDeItens(error: HttpErrorResponse) {
    if (error.status == 403 || error.status == 401) {
      localStorage.clear();
      this.router.navigate(['login']);
      this._snackBar.open('É necessário realizar o login para acessar as funcionalidades do sistema', 'fechar', {
        duration: 3500
      })
    }
    else {
      this._snackBar.open("Houve uma falha de comunicação com o servidor", "Fechar", {
        duration: 12000
      });
    }
  }
}
