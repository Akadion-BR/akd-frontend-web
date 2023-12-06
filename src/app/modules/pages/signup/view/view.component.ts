import { MatSnackBar } from '@angular/material/snack-bar';
import { CriacaoClienteRequest } from './../../../models/cliente/request/criacao/CriacaoClienteRequest';
import { FormGroup } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Util } from 'src/app/modules/utils/Util';
import { Subscription } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService) { };

  protected mouseAcimaDoLogo: boolean = false;

  protected dadosCadastrais: FormGroup;
  protected dadosContato: FormGroup;
  protected dadosPlano: FormGroup;

  criacaoClienteRequest: CriacaoClienteRequest;

  private criaNovoClienteSubscription$: Subscription;

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.criaNovoClienteSubscription$ != undefined) this.criaNovoClienteSubscription$.unsubscribe();
  }

  protected recebeFormGroupDadosCadastrais(event: any) {
    this.dadosCadastrais = event;
  }

  protected recebeFormGroupDadosContato(event: any) {
    this.dadosContato = event;
  }

  protected recebeFormGroupDadosPlano(event: any) {
    this.dadosPlano = event;
  }

  protected getValueAtributoDadosCadastrais(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosCadastrais)) return null;
    return this.dadosCadastrais.controls[atributo].value;
  }

  protected getValueAtributoDadosContato(atributo: string): any {
    return this.dadosContato.controls[atributo].value;
  }

  protected getValueAtributoDadosPlano(atributo: string): any {
    return this.dadosPlano.controls[atributo].value;
  }

  private constroiObjetoCriacaoClienteRequest() {

    this.criacaoClienteRequest = {
      dataNascimento: this.getValueAtributoDadosCadastrais('dataNascimento'),
      email: this.getValueAtributoDadosCadastrais('email'),
      nome: this.getValueAtributoDadosCadastrais('nome'),
      senha: this.getValueAtributoDadosCadastrais('senha'),
      cpf: this.getValueAtributoDadosCadastrais('cpf'),
      plano: {
        tipoPlano: this.getValueAtributoDadosPlano('tipoPlano'),
        formaPagamentoSistema: this.getValueAtributoDadosPlano('formaPagamentoSistema')
      },
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
    this.constroiObjetoCriacaoClienteRequest();
    console.log(this.criacaoClienteRequest);
    this.criaNovoClienteSubscription$ =
      this.clienteService.novoCliente(this.criacaoClienteRequest).subscribe({
        error: (error: any) => {
          this._snackBar.open("Ocorreu um erro ao cadastrar o cadastro", "Fechar", {
            duration: 3500
          })
        },
        complete: () => {
          this.router.navigate(['/']);
          this._snackBar.open("Cadastro realizado com sucesso", "Fechar", {
            duration: 3500
          });
        }
      });
  }


}
