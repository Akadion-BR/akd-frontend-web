import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AtualizacaoClienteRequest } from 'src/app/modules/models/cliente/request/atualizacao/AtualizacaoClienteRequest';
import { ClienteService } from '../../../signup/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Util } from 'src/app/modules/utils/Util';

@Component({
  selector: 'app-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.scss']
})
export class AlterarDadosComponent {

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService) { };

  protected mouseAcimaDoLogo: boolean = false;

  protected dadosCadastrais: FormGroup;
  protected dadosContato: FormGroup;

  atualizacaoClienteRequest: AtualizacaoClienteRequest;

  private atualizaClienteSubscription$: Subscription;

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.atualizaClienteSubscription$ != undefined) this.atualizaClienteSubscription$.unsubscribe();
  }

  protected recebeFormGroupDadosCadastrais(event: any) {
    this.dadosCadastrais = event;
  }

  protected recebeFormGroupDadosContato(event: any) {
    this.dadosContato = event;
  }

  protected getValueAtributoDadosCadastrais(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosCadastrais)) return null;
    return this.dadosCadastrais.controls[atributo].value;
  }

  protected getValueAtributoDadosContato(atributo: string): any {
    return this.dadosContato.controls[atributo].value;
  }

  private constroiObjetoAtualizacaoClienteRequest() {

    this.atualizacaoClienteRequest = {
      dataNascimento: this.getValueAtributoDadosCadastrais('dataNascimento'),
      email: this.getValueAtributoDadosCadastrais('email'),
      nome: this.getValueAtributoDadosCadastrais('nome'),
      senha: this.getValueAtributoDadosCadastrais('senha'),
      cpf: this.getValueAtributoDadosCadastrais('cpf'),
      telefone: {
        tipoTelefone: this.getValueAtributoDadosContato('numeroTelefone').length == 9
          ? 'MOVEL'
          : 'FIXO',
        prefixo: this.getValueAtributoDadosContato('prefixo'),
        numero: this.getValueAtributoDadosContato('numeroTelefone'),
      },
      endereco: {
        codigoPostal: this.getValueAtributoDadosContato('codigoPostal'),
        estado: this.getValueAtributoDadosContato('estado'),
        cidade: this.getValueAtributoDadosContato('cidade'),
        logradouro: this.getValueAtributoDadosContato('logradouro'),
        numero: this.getValueAtributoDadosContato('numeroEndereco'),
        bairro: this.getValueAtributoDadosContato('bairro'),
        complemento: this.getValueAtributoDadosContato('complemento')
      }
    }
  }

  public enviaFormularioCriacao() {
    this.constroiObjetoAtualizacaoClienteRequest();
    // this.atualizaClienteSubscription$ =
    //   this.clienteService.novoCliente(this.atualizacaoClienteRequest).subscribe({
    //     error: (error: any) => {
    //       this._snackBar.open("Ocorreu um erro ao cadastrar o cadastro", "Fechar", {
    //         duration: 3500
    //       })
    //     },
    //     complete: () => {
    //       this.router.navigate(['/painel/empresas']);
    //       this._snackBar.open("Cadastro realizado com sucesso", "Fechar", {
    //         duration: 3500
    //       });
    //     }
    //   });
  }

}
