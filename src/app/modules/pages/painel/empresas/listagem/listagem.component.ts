import { Util } from './../../../../utils/Util';
import { EmpresasService } from './../services/empresas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmpresaPageResponse } from 'src/app/modules/models/empresa/response/EmpresaPageResponse';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { PageSettings } from 'src/app/modules/models/globals/PageSettings';

@Component({
  selector: 'listagem-empresas',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ListagemComponent {

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresasService,
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.ref.detectChanges();
    this.implementaQueryParamPaginacao();
    this.realizaSetupCamposDeFormularioComQueryParamsDeBusca();
    this.invocaRequisicaoObtencaoEmpresasPaginadas();
  }

  getEmpresas$: Subscription;

  empresaPageResponse: EmpresaPageResponse;
  pageSettings: PageSettings;

  protected dadosPesquisa: FormGroup = this.createFormDadosPesquisa();

  private ENDPOINT_EMPRESAS: string = '/painel/empresas';

  ngOnDestroy(): void {
    if (this.getEmpresas$ != undefined) this.getEmpresas$.unsubscribe();
  }

  protected createFormDadosPesquisa(): FormGroup {
    return this.formBuilder.group({
      pesquisa: ['', [
        Validators.maxLength(70)
      ]],
      status: ['']
    })
  }

  protected geraOptionsStatus(): SelectOption[] {
    let options: SelectOption[] = [
      {
        text: 'Todas',
        value: null
      },
    ]

    options.push({
      text: ('Empresas ativas'),
      value: 'true'
    })

    options.push({
      text: ('Empresas inativas'),
      value: 'false'
    })

    return options;
  }

  protected implementaQueryParamPaginacao() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.pageSettings = new PageSettings()
      if (params.has('page')) {
        let page: any = params.get('page');
        if (/^\d+$/.test(page)) {
          this.pageSettings.pageNumber = parseInt(page);
        }
      }
      else {
        this.router.navigate(
          [],
          {
            queryParams: { page: this.pageSettings.pageNumber },
          }
        );
      }
    });
  }

  protected invocaRequisicaoObtencaoEmpresasPaginadas() {
    this.getEmpresas$ = this.empresaService.getEmpresas(
      this.dadosPesquisa.controls['pesquisa'].value,
      this.dadosPesquisa.controls['status'].value,
      this.pageSettings).subscribe(
        {
          next: (response: EmpresaPageResponse) => {
            this.empresaPageResponse = response;
          },
          error: () => {
            // TODO REALIZAR TRATAMENTO DE ERROS
          },
          complete: () => {
            console.log('Requisição de listagem de empresas realizada com sucesso')
          }
        });
  }

  protected realizaSetupCamposDeFormularioComQueryParamsDeBusca() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.has('busca')) {
        let buscaQueryParam: any = params.get('busca');
        if (Util.isNotEmptyString(buscaQueryParam)) {
          this.dadosPesquisa.controls['pesquisa'].setValue(buscaQueryParam);
        }
      }
      if (params.has('ativas')) {
        let ativasQueryParam: any = params.get('ativas');
        if (Util.isNotEmptyString(ativasQueryParam)) {
          if (ativasQueryParam == 'true') this.dadosPesquisa.controls['status'].setValue('true');
          else if (ativasQueryParam == 'false') this.dadosPesquisa.controls['status'].setValue('false');
          else this.dadosPesquisa.controls['status'].setValue(null);
        }
      }
    });
  }

  protected limpaFormulariosEmpresa() {

    this.pageSettings.pageNumber = 0;

    this.router.navigate(
      [],
      {
        queryParams: {
          busca: null,
          ativas: null,
          page: this.pageSettings.pageNumber
        },

      }
    );

    this.dadosPesquisa.reset();

    this.invocaRequisicaoObtencaoEmpresasPaginadas();
  }

  protected realizaPesquisaEmpresas() {
    let buscaEmpresasParam: string =
      Util.isNotEmptyString(this.dadosPesquisa.controls['pesquisa'].value)
        ? this.dadosPesquisa.controls['pesquisa'].value
        : null;

    let buscaEmpresasAtivasParam: string =
      Util.isNotEmptyString(this.dadosPesquisa.controls['status'].value)
        ? this.dadosPesquisa.controls['status'].value
        : null;

    this.pageSettings.pageNumber = 0;

    this.router.navigate(
      [],
      {
        queryParams: {
          busca: buscaEmpresasParam,
          ativas: buscaEmpresasAtivasParam,
          page: this.pageSettings.pageNumber
        },

      }
    );

    this.invocaRequisicaoObtencaoEmpresasPaginadas();
  }

  // PAGINAÇÃO ABAIXO

  protected geraNumerosParaNavegarNaPaginacao(n: number): Array<number> {
    return Array(n);
  }

  protected selecionarPagina(numeroPagina: number) {
    this.empresaPageResponse.pageNumber = numeroPagina;
    this.atualizaTelaAposAlteracaoNaPaginacao();
  }

  protected voltarPagina() {
    if (this.empresaPageResponse.pageNumber > 0) {
      this.empresaPageResponse.pageNumber--;
      this.atualizaTelaAposAlteracaoNaPaginacao();
    }
  }

  protected avancarPagina() {
    if (this.empresaPageResponse.pageNumber < this.empresaPageResponse.totalPages - 1) {
      this.empresaPageResponse.pageNumber++;
      this.atualizaTelaAposAlteracaoNaPaginacao();
    }
  }

  protected atualizaTelaAposAlteracaoNaPaginacao() {
    this.router.navigate(
      [],
      {
        queryParams: { 'page': this.empresaPageResponse.pageNumber },
      }
    ).then(() => {
      this.invocaRequisicaoObtencaoEmpresasPaginadas();
    });
  }

}
