import { Util } from './../../../../utils/Util';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { EmpresasService } from '../services/empresas.service';
import { Subscription, delay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaRequest } from 'src/app/modules/models/empresa/request/EmpresaRequest';
import { Router } from '@angular/router';
import { FormStatus } from 'src/app/modules/models/globals/FormStatus';

@Component({
  selector: 'cadastro-empresa',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CadastroComponent {

  constructor(
    private empresaService: EmpresasService,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  dadosEmpresa: FormGroup;
  dadosFiscais: FormGroup;

  empresaRequest: EmpresaRequest;

  formStatus: FormStatus = FormStatus.ABERTO;

  private criaNovaEmpresaSubscription$: Subscription;

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.criaNovaEmpresaSubscription$ != undefined) this.criaNovaEmpresaSubscription$.unsubscribe();
  }

  protected recebeFormGroupDadosEmpresa(event: any) {
    this.dadosEmpresa = event;
  }

  protected recebeFormGroupDadosFiscais(event: any) {
    this.dadosFiscais = event;
  }

  protected getValueAtributoDadosEmpresa(atributo: string): any {
    if (this.dadosEmpresa.controls[atributo].value == false || this.dadosEmpresa.controls[atributo].value == true)
      return this.dadosEmpresa.controls[atributo].value;
    else
      return Util.isEmpty(this.dadosEmpresa.controls[atributo].value)
        ? null
        : this.dadosEmpresa.controls[atributo].value;
  }

  protected getValueAtributoDadosFiscais(atributo: string): any {
    if (this.dadosFiscais.controls[atributo].value == false || this.dadosFiscais.controls[atributo].value == true)
      return this.dadosFiscais.controls[atributo].value;
    else
      return Util.isEmpty(this.dadosFiscais.controls[atributo].value)
        ? null
        : this.dadosFiscais.controls[atributo].value;
  }

  protected solicitarEnvioDeFormulario() {
    if (this.dadosFiscais.valid) {
      this.formStatus = FormStatus.PROCESSANDO;
      this.enviaFormularioCriacao();
    }
    else {
      this.dadosFiscais.markAllAsTouched();
      this._snackBar.open('Ops! Algum campo está incorreto. Revise o formulário e tente novamente.', "Fechar", {
        duration: 3500
      })
    }
  }

  protected validaSeFormulariosSaoValidos(): boolean {
    if (Util.isObjectEmpty(this.dadosEmpresa) || Util.isObjectEmpty(this.dadosFiscais))
      return false;

    else {
      if (this.dadosEmpresa.valid && this.dadosFiscais.valid) return true
      else return false
    }
  }

  protected acionaBotaoSubmit() {
    if (this.validaSeFormulariosSaoValidos()) {
      if (Util.isEmpty(this.getValueAtributoDadosFiscais('certificadoDigitalByteArray'))) {
        if (confirm("Nenhum certificado digital foi adicionado. Você não poderá realizar nenhum tipo de emissão fiscal até adicionar um certificado digital. Deseja continuar mesmo assim?")) {
          this.enviaFormularioCriacao();
        }
      }
      else {
        this.enviaFormularioCriacao();
      }
    }
    else {
      this.dadosEmpresa.markAllAsTouched();
      this.dadosFiscais.markAllAsTouched();
    }
  }

  private constroiObjetoEmpresaRequest() {
    this.empresaRequest = {
      razaoSocial: this.getValueAtributoDadosEmpresa('razaoSocial'),
      cnpj: this.getValueAtributoDadosEmpresa('cnpj'),
      endpoint: this.getValueAtributoDadosEmpresa('endpoint'),
      email: this.getValueAtributoDadosEmpresa('email'),
      nomeFantasia: this.getValueAtributoDadosEmpresa('nomeFantasia'),
      inscricaoEstadual: this.getValueAtributoDadosEmpresa('inscricaoEstadual'),
      inscricaoMunicipal: this.getValueAtributoDadosEmpresa('inscricaoMunicipal'),
      configFiscal: {
        discriminaImpostos: this.getValueAtributoDadosFiscais('discriminaImpostos'),
        habilitaNfe: this.getValueAtributoDadosFiscais('habilitaNfe'),
        habilitaNfce: this.getValueAtributoDadosFiscais('habilitaNfce'),
        habilitaNfse: this.getValueAtributoDadosFiscais('habilitaNfse'),
        habilitaEnvioEmailDestinatario: this.getValueAtributoDadosFiscais('habilitaEnvioEmailsDestinatario'),
        cnpjContabilidade: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('cnpjContabilidade'))
          ? this.getValueAtributoDadosFiscais('cnpjContabilidade')
          : null,
        senhaCertificadoDigital: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('senhaCertificado'))
          ? this.getValueAtributoDadosFiscais('senhaCertificado')
          : null,
        regimeTributario: this.getValueAtributoDadosFiscais('regimeTributario'),
        nfeConfig:
          this.getValueAtributoDadosFiscais('habilitaNfe')
            ? {
              proximoNumeroProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('proximoNumeroNfe'))
                ? this.getValueAtributoDadosFiscais('proximoNumeroNfe')
                : null,
              serieProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('numeroSerieNfe'))
                ? this.getValueAtributoDadosFiscais('numeroSerieNfe')
                : null,
              exibirReciboNaDanfe: this.getValueAtributoDadosFiscais('exibirReciboNaDanfeNfe'),
              imprimirColunasDoIpi: this.getValueAtributoDadosFiscais('imprimirColunasDoIpi'),
              mostraDadosDoIssqn: this.getValueAtributoDadosFiscais('mostraDadosDoIssqn'),
              imprimirImpostosAdicionaisNaDanfe: this.getValueAtributoDadosFiscais('imprimirImpostosAdicionaisNaDanfe'),
              sempreMostrarVolumesNaDanfe: this.getValueAtributoDadosFiscais('sempreMostrarVolumesNaDanfe'),
              orientacaoDanfe: this.getValueAtributoDadosFiscais('orientacaoDanfeNfe'),
            }
            : null,
        nfceConfig:
          this.getValueAtributoDadosFiscais('habilitaNfce')
            ? {
              proximoNumeroProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('proximoNumeroNfce'))
                ? this.getValueAtributoDadosFiscais('proximoNumeroNfce')
                : null,
              serieProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('numeroSerieNfce'))
                ? this.getValueAtributoDadosFiscais('numeroSerieNfce')
                : null,
              cscProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('cscNfce'))
                ? this.getValueAtributoDadosFiscais('cscNfce')
                : null,
              idTokenProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('idTokenNfce'))
                ? this.getValueAtributoDadosFiscais('idTokenNfce')
                : null,
            }
            : null,
        nfseConfig:
          this.getValueAtributoDadosFiscais('habilitaNfse')
            ? {
              proximoNumeroProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('proximoNumeroNfse'))
                ? this.getValueAtributoDadosFiscais('proximoNumeroNfse')
                : null,
              serieProducao: Util.isNotEmptyString(this.getValueAtributoDadosFiscais('numeroSerieNfse'))
                ? this.getValueAtributoDadosFiscais('numeroSerieNfse')
                : null,
            }
            : null,
        certificadoDigital: this.getValueAtributoDadosFiscais('nomeCertificadoDigital') != null
          && this.getValueAtributoDadosFiscais('tipoArquivoCertificadoDigital') != null
          && this.getValueAtributoDadosFiscais('certificadoDigitalByteArray') != null
          && this.getValueAtributoDadosFiscais('tamanhoArquivoCertificadoDigital') != null
          ? {
            nomeArquivo: this.getValueAtributoDadosFiscais('nomeCertificadoDigital') != null
              ? this.getValueAtributoDadosFiscais('nomeCertificadoDigital')[0]
              : null,
            tipoArquivo: this.getValueAtributoDadosFiscais('tipoArquivoCertificadoDigital')
              ? this.getValueAtributoDadosFiscais('tipoArquivoCertificadoDigital')[0]
              : null,
            base64: this.getValueAtributoDadosFiscais('certificadoDigitalByteArray') != null
              ? this.getValueAtributoDadosFiscais('certificadoDigitalByteArray')
              : null,
            tamanhoArquivo: this.getValueAtributoDadosFiscais('tamanhoArquivoCertificadoDigital') != null
              ? this.getValueAtributoDadosFiscais('tamanhoArquivoCertificadoDigital')[0]
              : null,
          }
          : null
      },
      telefone: {
        tipoTelefone: this.getValueAtributoDadosEmpresa('numeroTelefone') != null
          ? this.getValueAtributoDadosEmpresa('numeroTelefone').length == 9
            ? 'MOVEL'
            : 'FIXO'
          : null,
        prefixo: this.getValueAtributoDadosEmpresa('prefixo'),
        numero: this.getValueAtributoDadosEmpresa('numeroTelefone'),
      },
      endereco: {
        codigoPostal: this.getValueAtributoDadosEmpresa('codigoPostal'),
        estado: this.getValueAtributoDadosEmpresa('estado'),
        cidade: this.getValueAtributoDadosEmpresa('cidade'),
        logradouro: this.getValueAtributoDadosEmpresa('logradouro'),
        numero: this.getValueAtributoDadosEmpresa('numeroEndereco'),
        bairro: this.getValueAtributoDadosEmpresa('bairro'),
        complemento: this.getValueAtributoDadosEmpresa('complemento')
      }
    }
    console.log(this.empresaRequest);
  }

  public enviaFormularioCriacao() {
    this.formStatus = FormStatus.PROCESSANDO;
    console.log(this.formStatus);
    this.constroiObjetoEmpresaRequest();
    this.criaNovaEmpresaSubscription$ =
      this.empresaService.novaEmpresa(this.empresaRequest).subscribe(
        {
          error: (error: any) => {
            this.formStatus = FormStatus.ABERTO;
          },
          complete: () => {
            this.formStatus = FormStatus.ABERTO;
            this.router.navigate(['/painel/empresas']);
            this._snackBar.open("Cadastro realizado com sucesso", "Fechar", {
              duration: 3500
            });
          }
        }
      );

  }

}
