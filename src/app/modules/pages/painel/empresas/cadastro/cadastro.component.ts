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
    this.empresaRequest = {
      razaoSocial: this.getValueAtributoDadosEmpresa('razaoSocial'),
      cnpj: this.getValueAtributoDadosEmpresa(''),
      endpoint: this.getValueAtributoDadosEmpresa(''),
      email: this.getValueAtributoDadosEmpresa(''),
      nomeFantasia: this.getValueAtributoDadosEmpresa(''),
      inscricaoEstadual: this.getValueAtributoDadosEmpresa(''),
      inscricaoMunicipal: this.getValueAtributoDadosEmpresa(''),
      segmentoEmpresa: this.getValueAtributoDadosEmpresa(''),
      configFiscal: {
        discriminaImpostos: this.getValueAtributoDadosFiscais(''),
        habilitaNfe: this.getValueAtributoDadosFiscais(''),
        habilitaNfce: this.getValueAtributoDadosFiscais(''),
        habilitaNfse: this.getValueAtributoDadosFiscais(''),
        habilitaEnvioEmailDestinatario: this.getValueAtributoDadosFiscais(''),
        cnpjContabilidade: this.getValueAtributoDadosFiscais(''),
        senhaCertificadoDigital: this.getValueAtributoDadosFiscais(''),
        certificadoDigital: this.getValueAtributoDadosFiscais(''),
        regimeTributario: this.getValueAtributoDadosFiscais(''),
        nfeConfig: {
          proximoNumeroProducao: this.getValueAtributoDadosFiscais(''),
          serieProducao: this.getValueAtributoDadosFiscais(''),
          exibirReciboNaDanfe: this.getValueAtributoDadosFiscais(''),
          imprimirColunasDoIpi: this.getValueAtributoDadosFiscais(''),
          mostraDadosDoIssqn: this.getValueAtributoDadosFiscais(''),
          imprimirImpostosAdicionaisNaDanfe: this.getValueAtributoDadosFiscais(''),
          sempreMostrarVolumesNaDanfe: this.getValueAtributoDadosFiscais(''),
        },
        nfceConfig: {
          proximoNumeroProducao: this.getValueAtributoDadosFiscais(''),
          serieProducao: this.getValueAtributoDadosFiscais(''),
          cscProducao: this.getValueAtributoDadosFiscais(''),
          idTokenProducao: this.getValueAtributoDadosFiscais(''),
        },
        nfseConfig: {
          proximoNumeroProducao: this.getValueAtributoDadosFiscais(''),
          serieProducao: this.getValueAtributoDadosFiscais(''),
        },
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
