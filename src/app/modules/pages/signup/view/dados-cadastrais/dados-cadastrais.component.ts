
import { Subscription, debounceTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Mask } from 'src/app/modules/utils/Mask';
import { Util } from 'src/app/modules/utils/Util';
import { ClienteService } from '../../services/cliente.service';
import { Cpf } from 'src/app/modules/models/globals/cpf';
import { CustomInputComponent } from 'src/app/modules/shared/inputs/custom-input/custom-input.component';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss']
})
export class DadosCadastraisComponent {

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private ref: ChangeDetectorRef) { }

  // Subscriptions
  validaDuplicidadeCpfSubscription$: Subscription;
  
  protected dadosCadastrais: FormGroup = this.createFormDadosCadastrais();

  @Output() emissorDeDadosCadastrais = new EventEmitter<FormGroup>();

  dadosCadastraisSubscribe$: Subscription = this.dadosCadastrais.valueChanges.pipe(
    debounceTime(500)
  ).subscribe({
    next: () => {
      this.emissorDeDadosCadastrais.emit(this.dadosCadastrais);
    }
  })

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.emissorDeDadosCadastrais.emit(this.dadosCadastrais);
  }

  ngOnDestroy(): void {
    if (this.validaDuplicidadeCpfSubscription$ != undefined) this.validaDuplicidadeCpfSubscription$.unsubscribe();
    if (this.dadosCadastraisSubscribe$ != undefined) this.dadosCadastraisSubscribe$.unsubscribe();
  }

  createFormDadosCadastrais(): FormGroup {
    return this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.maxLength(70)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70)
      ]],
      cpf: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
        Validators.maxLength(14)
      ]
      ],
      dataNascimento: ['',
        [
          Validators.required,
          this.dataNascimentoCustomValidator()
        ]
      ],
      senha: ['', [
        Validators.required,
        Validators.maxLength(25),
      ]],
      confirmaSenha: ['', [
        Validators.required,
        Validators.maxLength(25),
        this.passwordCustomValidator()
      ]]
    });
  }

  protected getValueAtributoDadosCadastrais(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosCadastrais)) return null;
    return this.dadosCadastrais.controls[atributo].value;
  }

  protected setValueParaAtributoDadosCadastrais(atributo: string, valor: any) {
    this.dadosCadastrais.controls[atributo].setValue(valor);
  }

  realizaTratamentoCpfCnpj(tecla: any) {

    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setValueParaAtributoDadosCadastrais('cpf', Mask.cpfMask(this.getValueAtributoDadosCadastrais('cpf')));
    }

    this.invocaValidacaoDuplicidadeCpfCnpj();
  }

  invocaValidacaoDuplicidadeCpfCnpj() {
    if (this.getValueAtributoDadosCadastrais('cpf').length == 14 && this.dadosCadastrais.controls['cpf'].valid) {

      this.validaDuplicidadeCpfSubscription$ = this.clienteService.validaDuplicidadeCpf(
        new Cpf(this.getValueAtributoDadosCadastrais('cpf'))).subscribe({
          error: (error: any) => {
            this.setValueParaAtributoDadosCadastrais('cpf', '');
            this.dadosCadastrais.controls['cpf'].reset();
            this.snackBar.open(error, "Fechar", {
              duration: 3500
            });
          },
          complete: () => {
            console.log('Validação de duplicidade de Cpf finalizada com sucesso')
          }
        });

    }

  }

  validaDataNascimento() {

    if (Util.isEmptyString(this.getValueAtributoDadosCadastrais('dataNascimento')))
      return;

    let dataNascimentoSplitada = this.getValueAtributoDadosCadastrais('dataNascimento').split("-");
    if (dataNascimentoSplitada.length == 3) {
      if (parseInt(dataNascimentoSplitada[0]) > 2023 || parseInt(dataNascimentoSplitada[0]) < 1900) {
        this.setValueParaAtributoDadosCadastrais('dataNascimento', '');
        this.snackBar.open("Data de nascimento inválida", "Fechar", {
          duration: 3500
        })
        return;
      }
    }
  }

  dataNascimentoCustomValidator(): ValidatorFn {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      if (Util.isEmptyString(this.getValueAtributoDadosCadastrais('dataNascimento')))
        return null;

      let today: Date = new Date();
      today.setHours(0, 0, 0, 0);

      let minDate: Date = new Date();
      minDate.setFullYear(1900);

      let splittedDataInput: any[] = this.getValueAtributoDadosCadastrais('dataNascimento').split('-');
      let dataNascimentoInput = new Date(splittedDataInput[0], splittedDataInput[1] - 1, splittedDataInput[2]);

      if (dataNascimentoInput > today
        || dataNascimentoInput.getFullYear() < minDate.getFullYear()
        || dataNascimentoInput.toString() == 'Invalid Date') {
        return { nameWrong: true };
      }

      return null;
    }
  }

  passwordCustomValidator(): ValidatorFn {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      if (this.getValueAtributoDadosCadastrais('senha') == null)
        return null;

      if (this.getValueAtributoDadosCadastrais('confirmaSenha') == null)
        return null;

      let senhaInput = this.getValueAtributoDadosCadastrais('senha');
      let confirmaSenhaInput = this.getValueAtributoDadosCadastrais('confirmaSenha');

      if (senhaInput != confirmaSenhaInput) {
        return { nameWrong: true };
      }

      return null;
    }
  }

  verificaSePodeAvancar() {
    if (this.dadosCadastrais.invalid) {
      this.dadosCadastrais.markAllAsTouched();
      this.snackBar.open("Revise o formulário e tente novamente", "Fechar", {
        duration: 3500
      })

    }
  }

}
