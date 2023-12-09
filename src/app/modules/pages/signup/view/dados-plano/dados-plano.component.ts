import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dados-plano',
  templateUrl: './dados-plano.component.html',
  styleUrls: ['./dados-plano.component.scss']
})
export class DadosPlanoComponent {

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private ref: ChangeDetectorRef) { }

  public planoSelecionado: string = 'BASIC';
  protected dadosPlano: FormGroup = this.createFormDadosPlano();

  @Output() emissorDeDadosPlano = new EventEmitter<FormGroup>();
  @Output() emissorDeSolicitacaoDeEnvioDeFormulario = new EventEmitter();

  dadosPlanoSubscribe$: Subscription = this.dadosPlano.valueChanges.pipe(
    debounceTime(500)
  ).subscribe({
    next: () => {
      this.emissorDeDadosPlano.emit(this.dadosPlano);
    }
  })

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.emissorDeDadosPlano.emit(this.dadosPlano);
  }

  ngOnDestroy(): void {
    if (this.dadosPlanoSubscribe$ != undefined) this.dadosPlanoSubscribe$.unsubscribe();
  }

  createFormDadosPlano(): FormGroup {
    return this.formBuilder.group({
      tipoPlano: new FormControl(
        {
          value: this.planoSelecionado,
          disabled: false
        },
        [
          Validators.required
        ]
      ),
      formaPagamentoSistema: new FormControl(
        {
          value: 'BOLETO',
          disabled: false
        },
        [
          Validators.required,
        ]
      ),
    });
  }

  verificaSeTipoDePlanoCorrespondeAoBloco(bloco: string) {
    if (bloco == this.planoSelecionado) return true;
    else return false;
  }

  mudaPlano(novoPlano: string) {
    this.planoSelecionado = novoPlano;
    this.dadosPlano.controls['tipoPlano'].setValue(this.planoSelecionado);
  }

  protected solicitarEnvioDeFormulario() {
    if (this.dadosPlano.valid) this.emissorDeSolicitacaoDeEnvioDeFormulario.emit();
    else {
      this.dadosPlano.markAllAsTouched();
      this._snackBar.open('Ops! Algum campo está incorreto. Revise o formulário e tente novamente.', "Fechar", {
        duration: 3500
      })
    }
  }

}
