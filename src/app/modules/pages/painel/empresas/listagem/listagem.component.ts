import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'listar-minhas-empresas',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ListagemComponent {

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef) { }

  protected dadosPesquisa: FormGroup = this.createFormDadosPesquisa();

  createFormDadosPesquisa(): FormGroup {
    return this.formBuilder.group({
      pesquisa: ['', [
        Validators.maxLength(70)
      ]],
      status: ['']
    })
  }

  protected geraOptionsStatus(): SelectOption[] {
    let options: SelectOption[] = [
      {
        text: '',
        value: ''
      },
    ]

    options.push({
      text: ('Empresas ativas'),
      value: true
    })

    options.push({
      text: ('Empresas inativas'),
      value: false
    })

    return options;
  }

}
