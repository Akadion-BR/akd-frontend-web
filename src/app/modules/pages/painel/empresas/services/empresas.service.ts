import { PageSettings } from './../../../../models/globals/PageSettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, retry } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api-config';
import { EmpresaRequest } from 'src/app/modules/models/empresa/request/EmpresaRequest';
import { EmpresaPageResponse } from 'src/app/modules/models/empresa/response/EmpresaPageResponse';
import { EmpresaResponse } from 'src/app/modules/models/empresa/response/EmpresaResponse';
import { Cnpj } from 'src/app/modules/models/globals/cnpj';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http: HttpClient) { }

  private httpOptions = {
    params: new HttpParams({
    }),
  }

  public novaEmpresa(empresaRequest: EmpresaRequest): Observable<EmpresaResponse> {
    return this.http.post<EmpresaResponse>(`${API_CONFIG.baseUrl}/empresa`, empresaRequest);
  }

  public getEmpresas(valorBusca: string, empresasAtivas: string, pageSettings: PageSettings | null): Observable<EmpresaPageResponse> {

    this.httpOptions.params = new HttpParams();
    this.buildRequestParams(valorBusca, empresasAtivas);
    this.buildPageableParams(pageSettings);

    return this.http.get<EmpresaPageResponse>(`${API_CONFIG.baseUrl}/empresa`, this.httpOptions).pipe(
      map((resposta: any) => new EmpresaPageResponse(resposta)),
      retry({ count: 20, delay: 10000 })
    );
  }

  public validaDuplicidadeCnpj(cnpj: Cnpj) {
    return this.http.post(`${API_CONFIG.baseUrl}/empresa/verifica-cnpj`, cnpj)
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
}
