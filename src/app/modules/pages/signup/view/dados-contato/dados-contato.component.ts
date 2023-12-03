import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dados-contato',
  templateUrl: './dados-contato.component.html',
  styleUrls: ['./dados-contato.component.scss']
})
export class DadosContatoComponent {

  constructor(private formBuilder: FormBuilder) { }

  inputPrefixoPattern: any = /^\d{2}/;
  inputTelefonePattern: any;

  protected dadosContato: FormGroup = this.createFormDadosContato();

  createFormDadosContato(): FormGroup {
    return this.formBuilder.group({
      prefixo: new FormControl(
        {
          value: '',
          disabled: true
        },
        [
          Validators.pattern(this.inputPrefixoPattern)
        ]
      ),
      numeroTelefone: new FormControl(
        {
          value: '',
          disabled: true
        },
        [
          Validators.pattern(this.inputTelefonePattern)
        ]
      ),
      codigoPostal: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(9),
          Validators.pattern(/^\d{5}\-\d{3}$/)
        ]
      ),
      estado: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(50)
        ]
      ),
      cidade: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(50)
        ]
      ),
      logradouro: new FormControl(
        {
          value: '',
          disabled: false
        },
      ),
      numero: new FormControl(
        {
          value: '',
          disabled: false
        },
      ),
      bairro: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(50)
        ]
      ),
      complemento: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(50)
        ]
      )
    });
  }

}
