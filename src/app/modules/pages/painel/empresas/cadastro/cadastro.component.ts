import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { EmpresasService } from '../services/empresas.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaRequest } from 'src/app/modules/models/empresa/request/EmpresaRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'cadastro-empresa',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CadastroComponent {

  constructor(
    private empresaService: EmpresasService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  dadosEmpresa: FormGroup;
  dadosFiscais: FormGroup;

  empresaRequest: EmpresaRequest;

  private criaNovaEmpresaSubscription$: Subscription;

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
    return this.dadosEmpresa.controls[atributo].value;
  }

  protected getValueAtributoDadosFiscais(atributo: string): any {
    return this.dadosFiscais.controls[atributo].value;
  }

  private constroiObjetoEmpresaRequest() {
    console.log(this.dadosEmpresa);
    console.log(this.dadosFiscais);
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
        cnpjContabilidade: this.getValueAtributoDadosFiscais('cnpjContabilidade'),
        senhaCertificadoDigital: this.getValueAtributoDadosFiscais('senhaCertificado'),
        regimeTributario: this.getValueAtributoDadosFiscais('regimeTributario'),
        nfeConfig:
          this.getValueAtributoDadosFiscais('habilitaNfe')
            ? {
              proximoNumeroProducao: this.getValueAtributoDadosFiscais('proximoNumeroNfe'),
              serieProducao: this.getValueAtributoDadosFiscais('numeroSerieNfe'),
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
              proximoNumeroProducao: this.getValueAtributoDadosFiscais('proximoNumeroNfce'),
              serieProducao: this.getValueAtributoDadosFiscais('numeroSerieNfce'),
              cscProducao: this.getValueAtributoDadosFiscais('cscNfce'),
              idTokenProducao: this.getValueAtributoDadosFiscais('idTokenNfce'),
            }
            : null,
        nfseConfig:
          this.getValueAtributoDadosFiscais('habilitaNfse')
            ? {
              proximoNumeroProducao: this.getValueAtributoDadosFiscais('proximoNumeroNfse'),
              serieProducao: this.getValueAtributoDadosFiscais('numeroSerieNfse'),
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
        tipoTelefone: this.getValueAtributoDadosEmpresa('numeroTelefone').length == 9
          ? 'MOVEL'
          : 'FIXO',
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
  }

  public enviaFormularioCriacao() {
    this.constroiObjetoEmpresaRequest();
    console.log(this.empresaRequest);
    this.criaNovaEmpresaSubscription$ =
      this.empresaService.novaEmpresa(this.empresaRequest).subscribe({
        error: (error: any) => {
          this._snackBar.open("Ocorreu um erro ao realizar o cadastro", "Fechar", {
            duration: 3500
          })
        },
        complete: () => {
          this.router.navigate(['/painel/empresas']);
          this._snackBar.open("Cadastro realizado com sucesso", "Fechar", {
            duration: 3500
          });
        }
      });
  }

}
