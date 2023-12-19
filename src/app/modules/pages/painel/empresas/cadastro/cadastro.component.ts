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

  private constroiObjetoEmpresaRequest() {

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
