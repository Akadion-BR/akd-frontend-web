import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss']
})
export class DadosCadastraisComponent {

  constructor(private formBuilder: FormBuilder) { }

  protected dadosCadastrais: FormGroup = this.createFormDadosCadastrais();

  createFormDadosCadastrais(): FormGroup {
    return this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      cpf: ['',
        [
          // Validators.pattern(this.inputPatternCpfCnpj)
        ]
      ],
      dataNascimento: [''],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

}
