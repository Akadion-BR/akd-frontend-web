import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { slideUpDownAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'dados-fiscais-empresa',
  templateUrl: './dados-fiscais.component.html',
  styleUrls: ['./dados-fiscais.component.scss'],
  animations: [slideUpDownAnimation]
})
export class DadosFiscaisComponent {

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar) { }

  protected dadosFiscais: FormGroup = this.inicializaFormulario();

  inicializaFormulario(): FormGroup {
    return this.formBuilder.group({
      habilitaEnvioEmailsDestinatario: [false,
        [
          Validators.required,
        ]
      ],
      discriminaImpostos: [false,
        [
          Validators.required,
        ]
      ],
      exibeReciboNaDanfe: [false,
        [
          Validators.required,
        ]
      ],
      cnpjContabilidade: ['',
        [

        ]
      ],
      orientacaoDanfe: ['PORTRAIT',
        [
          Validators.required
        ]
      ],
      regimeTributario: ['SIMPLES_NACIONAL',
        [
          Validators.required
        ]
      ],
      habilitaNfe: [false,
        [
          Validators.required,
        ]
      ],
      habilitaNfce: [false,
        [
          Validators.required,
        ]
      ],
      habilitaNfse: [false,
        [
          Validators.required,
        ]
      ],
      numeroSerieNfe: [0,
        [
          Validators.required
        ]
      ],
      proximoNumeroNfe: [0,
        [
          Validators.required
        ]
      ],
      exibirReciboNaDanfeNfe: [false,
        [
          Validators.required,
        ]
      ],
      imprimirColunasDoIpi: [false,
        [
          Validators.required,
        ]
      ],
      mostraDadosDoIssqn: [false,
        [
          Validators.required,
        ]
      ],
      imprimirImpostosAdicionaisNaDanfe: [false,
        [
          Validators.required,
        ]
      ],
      sempreMostrarVolumesNaDanfe: [false,
        [
          Validators.required,
        ]
      ],
      orientacaoDanfeNfe: ['PORTRAIT',
        [
          Validators.required
        ]
      ],
      numeroSerieNfce: [0,
        [
          Validators.required
        ]
      ],
      proximoNumeroNfce: [0,
        [
          Validators.required
        ]
      ],
      numeroSerieNfse: [0,
        [
          Validators.required
        ]
      ],
      proximoNumeroNfse: [0,
        [
          Validators.required
        ]
      ]
    });
  }

  // Geradores de Select options
  protected geraOptionsOrientacaoDanfe(): SelectOption[] {
    let options: SelectOption[] = [
      {
        text: 'Retrato',
        value: 'PORTRAIT'
      },
      {
        text: 'Paisagem',
        value: 'LANDSCAPE'
      }
    ]

    return options;
  }

  protected geraOptionsRegimeTributario(): SelectOption[] {
    let options: SelectOption[] = [
      {
        text: 'Simples nacional',
        value: 'SIMPLES_NACIONAL'
      },
      {
        text: 'Simples nacional - Excesso de sublimite de receita bruta',
        value: 'SIMPLES_NACIONAL_EXCESSO_SUBLIME'
      },
      {
        text: 'Regime normal',
        value: 'REGIME_NORMAL'
      }
    ]

    return options;
  }
}
