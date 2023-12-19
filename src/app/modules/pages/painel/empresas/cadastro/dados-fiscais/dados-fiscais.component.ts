import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, debounceTime } from 'rxjs';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { Util } from 'src/app/modules/utils/Util';
import { fadeInOutAnimation, slideUpDownAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'dados-fiscais-empresa',
  templateUrl: './dados-fiscais.component.html',
  styleUrls: ['./dados-fiscais.component.scss'],
  animations: [fadeInOutAnimation, slideUpDownAnimation]
})
export class DadosFiscaisComponent {

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar) { }

  dadosFiscais: FormGroup = this.inicializaFormulario();
  arquivoCertificadoDigital: File | null;

  @Output() emissorDeDadosFiscais = new EventEmitter<FormGroup>();
  @Output() emissorDeSolicitacaoDeEnvioDeFormulario = new EventEmitter();

  dadosFiscaisSubscribe$: Subscription = this.dadosFiscais.valueChanges.pipe(
    debounceTime(500)
  ).subscribe({
    next: () => {
      this.emissorDeDadosFiscais.emit(this.dadosFiscais);
    }
  })

  ngOnDestroy(): void {
    if (this.dadosFiscaisSubscribe$ != undefined) this.dadosFiscaisSubscribe$.unsubscribe();
  }

  inicializaFormulario(): FormGroup {
    return this.formBuilder.group({
      discriminaImpostos: [false,
        [
          Validators.required,
        ]
      ],
      habilitaEnvioEmailsDestinatario: [false,
        [
          Validators.required,
        ]
      ],
      cnpjContabilidade: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
          Validators.maxLength(18)
        ]
      ],
      regimeTributario: ['SIMPLES_NACIONAL',
        [
          Validators.required
        ]
      ],
      habilitaNfe: [
        {
          value: false,
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
      numeroSerieNfe: [
        {
          value: 1,
          disabled: true
        },
        [
          Validators.min(1),
          Validators.max(100),
          Validators.pattern(/[^a-zA-Z ]/g),
        ]
      ],
      proximoNumeroNfe: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.pattern(/[^a-zA-Z ]/g)
        ]
      ],
      exibirReciboNaDanfeNfe: [
        {
          value: false,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],
      imprimirColunasDoIpi: [
        {
          value: false,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],
      mostraDadosDoIssqn: [
        {
          value: false,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],
      imprimirImpostosAdicionaisNaDanfe: [
        {
          value: false,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],
      sempreMostrarVolumesNaDanfe: [
        {
          value: false,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],
      orientacaoDanfeNfe: [
        {
          value: 'PORTRAIT',
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      habilitaNfce: [
        {
          value: false,
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
      numeroSerieNfce: [
        {
          value: 1,
          disabled: true
        },
        [
          Validators.min(1),
          Validators.max(100),
          Validators.pattern(/[^a-zA-Z ]/g),
        ]
      ],
      proximoNumeroNfce: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.pattern(/[^a-zA-Z ]/g)
        ]
      ],
      cscNfce: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      IdTokenNfce: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      habilitaNfse: [
        {
          value: false,
          disabled: false
        },
        [
          Validators.required,
        ]
      ],
      numeroSerieNfse: [
        {
          value: 1,
          disabled: true
        },
        [
          Validators.min(1),
          Validators.max(100),
          Validators.pattern(/[^a-zA-Z ]/g),
        ]
      ],
      proximoNumeroNfse: [
        {
          value: null,
          disabled: true
        },
        [
          Validators.pattern(/[^a-zA-Z ]/g)
        ]
      ],
      certificadoDigital: [null,
        [
        ]
      ],
      senhaCertificado: ['',
        [
        ]
      ]
    });
  }

  protected getFormValue(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosFiscais)) return null;
    return this.dadosFiscais.controls[atributo].value;
  }

  protected setFormValue(atributo: string, valor: any) {
    this.dadosFiscais.controls[atributo].setValue(valor);
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

  protected limpaInputContrato() {
    this.dadosFiscais.controls['certificadoDigital'].setValue(null);
    this.arquivoCertificadoDigital = null;
  }

  protected setaContrato(event: any) {
    if (event.target.files[0] == undefined) this.arquivoCertificadoDigital = null;
    else {
      const max_size = 1048576;
      const allowed_types = ['.pfx', '.p7b', '.crt', '.cert'];

      if (event.target.files[0].size > max_size) {
        this._snackBar.open("O tamanho do arquivo não pode ser maior do que 1MB", "Fechar", {
          duration: 5000
        })
        this.limpaInputContrato();
        return;
      }
      // else if (!(allowed_types.includes(event.target.files[0].type))) {
      //   this._snackBar.open("Tipo de arquivo inválido. Escolha uma imagem, um pdf ou um arquivo word", "Fechar", {
      //     duration: 5000
      //   })
      //   this.limpaInputContrato();
      //   return;
      // }
      else {
        this.arquivoCertificadoDigital = event.target.files[0];
      }

    }
  }

  protected solicitarEnvioDeFormulario() {
    if (this.dadosFiscais.valid) this.emissorDeSolicitacaoDeEnvioDeFormulario.emit();
    else {
      this.dadosFiscais.markAllAsTouched();
      this._snackBar.open('Ops! Algum campo está incorreto. Revise o formulário e tente novamente.', "Fechar", {
        duration: 3500
      })
    }
  }
}
