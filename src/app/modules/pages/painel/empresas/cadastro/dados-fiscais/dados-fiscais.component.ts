import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, debounceTime } from 'rxjs';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { Mask } from 'src/app/modules/utils/Mask';
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
      idTokenNfce: [
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
          disabled: false,
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
      certificadoDigital: [null],
      senhaCertificado: ['']
    });
  }

  protected getFormValue(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosFiscais)) return null;
    return this.dadosFiscais.controls[atributo].value;
  }

  protected setFormValue(atributo: string, valor: any) {
    this.dadosFiscais.controls[atributo].setValue(valor);
  }

  realizaTratamentoCnpj(tecla: any) {
    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setFormValue('cnpjContabilidade', Mask.cnpjMask(this.getFormValue('cnpjContabilidade')));
    }
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

  // Alteração de status de NFE, NFCE e NFSE
  protected alteraStatusNfe() {
    let statusNfe: boolean = this.getFormValue('habilitaNfe');
    if (statusNfe) {
      this.dadosFiscais.controls['exibirReciboNaDanfeNfe'].enable();
      this.dadosFiscais.controls['imprimirColunasDoIpi'].enable();
      this.dadosFiscais.controls['mostraDadosDoIssqn'].enable();
      this.dadosFiscais.controls['imprimirImpostosAdicionaisNaDanfe'].enable();
      this.dadosFiscais.controls['sempreMostrarVolumesNaDanfe'].enable();
      this.dadosFiscais.controls['orientacaoDanfeNfe'].enable();
      this.dadosFiscais.controls['numeroSerieNfe'].enable();
      this.dadosFiscais.controls['proximoNumeroNfe'].enable();
    }
    else {
      this.dadosFiscais.controls['exibirReciboNaDanfeNfe'].disable();
      this.dadosFiscais.controls['imprimirColunasDoIpi'].disable();
      this.dadosFiscais.controls['mostraDadosDoIssqn'].disable();
      this.dadosFiscais.controls['imprimirImpostosAdicionaisNaDanfe'].disable();
      this.dadosFiscais.controls['sempreMostrarVolumesNaDanfe'].disable();
      this.dadosFiscais.controls['orientacaoDanfeNfe'].disable();
      this.dadosFiscais.controls['numeroSerieNfe'].disable();
      this.dadosFiscais.controls['proximoNumeroNfe'].disable();
    }
  }

  protected alteraStatusNfce() {
    let statusNfce: boolean = this.getFormValue('habilitaNfce');
    if (statusNfce) {
      this.dadosFiscais.controls['numeroSerieNfce'].enable();
      this.dadosFiscais.controls['proximoNumeroNfce'].enable();
      this.dadosFiscais.controls['cscNfce'].enable();
      this.dadosFiscais.controls['idTokenNfce'].enable();
    }
    else {
      this.dadosFiscais.controls['numeroSerieNfce'].disable();
      this.dadosFiscais.controls['proximoNumeroNfce'].disable();
      this.dadosFiscais.controls['cscNfce'].disable();
      this.dadosFiscais.controls['idTokenNfce'].disable();
    }
  }

  protected alteraStatusNfse() {
    let statusNfse: boolean = this.getFormValue('habilitaNfse');
    if (statusNfse) {
      this.dadosFiscais.controls['numeroSerieNfse'].enable();
      this.dadosFiscais.controls['proximoNumeroNfse'].enable();
    }
    else {
      this.dadosFiscais.controls['numeroSerieNfse'].disable();
      this.dadosFiscais.controls['proximoNumeroNfse'].disable();
    }
  }

  protected limpaInputCertificadoDigital() {
    this.dadosFiscais.controls['certificadoDigital'].setValue(null);
    this.arquivoCertificadoDigital = null;
    this.dadosFiscais.controls['senhaCertificado'].reset();
    this.dadosFiscais.controls['senhaCertificado'].clearValidators();
    this.dadosFiscais.controls['senhaCertificado'].updateValueAndValidity();
  }

  protected setaCertificadoDigital(event: any) {
    if (event.target.files[0] == undefined) {
      this.limpaInputCertificadoDigital();
    }
    else {
      const max_size = 1048576;
      if (event.target.files[0].size > max_size) {
        this._snackBar.open("O tamanho do arquivo não pode ser maior do que 1MB", "Fechar", {
          duration: 5000
        })
        this.limpaInputCertificadoDigital();
        return;
      }
      else {
        this.arquivoCertificadoDigital = event.target.files[0];
        this.dadosFiscais.controls["senhaCertificado"].addValidators([Validators.required]);
      }
      this.dadosFiscais.controls['senhaCertificado'].markAsTouched();
      this.dadosFiscais.controls['senhaCertificado'].updateValueAndValidity();

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
