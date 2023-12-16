import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mask } from 'src/app/modules/utils/Mask';
import { Util } from 'src/app/modules/utils/Util';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { EmpresasService } from '../services/empresas.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cnpj } from 'src/app/modules/models/globals/cnpj';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { EstadosResponse } from 'src/app/shared/brasil-api/models/estados-response';
import { MunicipiosResponse } from 'src/app/shared/brasil-api/models/municipios-response';
import { BrasilApiService } from 'src/app/shared/brasil-api/services/brasil-api.service';
import { ConsultaCepResponse } from 'src/app/shared/brasil-api/models/consulta-cep-response';

@Component({
  selector: 'cadastro-empresa',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CadastroComponent {
  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private brasilApiService: BrasilApiService,
    private empresaService: EmpresasService) { }

  // Subscriptions
  validaDuplicidadeCnpjSubscription$: Subscription;
  obtemTodosEstadosBrasileirosSubscription$: Subscription;
  obtemTodosMunicipiosPorEstadoSubscription$: Subscription;
  getEnderecoPeloCepSubscription$: Subscription;

  protected dadosEmpresa: FormGroup = this.inicializaFormulario();

  estadosOptions: SelectOption[];
  estadosResponse: EstadosResponse[];
  municipiosResponse: MunicipiosResponse[];
  municipiosOptions: SelectOption[];

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.obtemTodosEstadosBrasileiros();
  }

  ngOnDestroy(): void {
    if (this.validaDuplicidadeCnpjSubscription$ != undefined) this.validaDuplicidadeCnpjSubscription$.unsubscribe();
    if (this.obtemTodosEstadosBrasileirosSubscription$ != undefined) this.obtemTodosEstadosBrasileirosSubscription$.unsubscribe();
    if (this.obtemTodosMunicipiosPorEstadoSubscription$ != undefined) this.obtemTodosMunicipiosPorEstadoSubscription$.unsubscribe();
    if (this.getEnderecoPeloCepSubscription$ != undefined) this.getEnderecoPeloCepSubscription$.unsubscribe();
  }

  inicializaFormulario(): FormGroup {
    return this.formBuilder.group({
      razaoSocial: ['',
        [
          Validators.required,
          Validators.maxLength(70)
        ]
      ],
      cnpj: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
          Validators.maxLength(18)
        ]
      ],
      endpoint: ['',
        [
          Validators.required,
          Validators.pattern(/^[a-z]+$/),
          Validators.maxLength(30)
        ]
      ],
      nomeFantasia: ['',
        [
          Validators.required,
          Validators.maxLength(70)
        ]
      ],
      inscricaoEstadual: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{12}$/),
          Validators.maxLength(12),
        ]
      ],
      inscricaoMunicipal: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{12}$/),
          Validators.maxLength(12)
        ]
      ],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70)
      ]
      ],
      prefixo: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.pattern(/^\d{2}/)
        ]
      ],
      numeroTelefone: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.pattern(/^(?:((?:9\d|[2-9])\d{3})(\d{4}))$/)
        ]
      ],
      codigoPostal: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(/^((\d{5})-(\d{3}))$/)
        ]
      ],
      estado: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required
        ]
      ],
      cidade: [
        {
          value: '',
          disabled: true
        },
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ],
      logradouro: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroEndereco: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.pattern(/^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/),
          Validators.required
        ]
      ],
      bairro: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ],
      complemento: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(100)
        ]
      ]
    });
  }

  protected getFormValue(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosEmpresa)) return null;
    return this.dadosEmpresa.controls[atributo].value;
  }

  protected setFormValue(atributo: string, valor: any) {
    this.dadosEmpresa.controls[atributo].setValue(valor);
  }

  // Geradores de Select options
  protected geraOptionsEstado() {
    let options: SelectOption[] = [
      {
        text: '',
        value: ''
      },
    ]

    this.estadosResponse.forEach(estado => {
      options.push({
        text: (estado.sigla + ' - ' + estado.nome).toUpperCase(),
        value: estado.sigla
      })
    })

    this.estadosOptions = options;
  }

  protected geraOptionsMunicipio() {
    let options: SelectOption[] = [
      {
        text: '',
        value: ''
      },
    ]

    this.municipiosResponse.forEach(municipio => {
      options.push({
        text: (municipio.nome).toUpperCase(),
        value: municipio.nome
      })
    })

    this.municipiosOptions = options;
  }

  realizaTratamentoCnpj(tecla: any) {

    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setFormValue('cnpj', Mask.cnpjMask(this.getFormValue('cnpj')));
    }

    this.invocaValidacaoDuplicidadeCnpj();
  }

  invocaValidacaoDuplicidadeCnpj() {
    if (this.getFormValue('cnpj').length == 18 && this.dadosEmpresa.controls['cnpj'].valid) {

      this.validaDuplicidadeCnpjSubscription$ = this.empresaService.validaDuplicidadeCnpj(
        new Cnpj(this.getFormValue('cnpj'))).subscribe({
          error: (error: any) => {
            this.setFormValue('cnpj', '');
            this.dadosEmpresa.controls['cnpj'].reset();
            this._snackBar.open(error, "Fechar", {
              duration: 3500
            });
          },
          complete: () => {
            console.log('Validação de duplicidade de Cnpj finalizada com sucesso')
          }
        });

    }

  }

  realizaTratamentoEndpoint() {
    this.setFormValue('endpoint',
      this.getFormValue('endpoint').replace(/[^a-zA-Z ]/g, "").replace(/ /g, '').toLowerCase())
  }

  realizaTratamentoInscricaoEstadual() {
    this.setFormValue('inscricaoEstadual',
      this.getFormValue('inscricaoEstadual').replace(/\D/g, '').replace(/ /g, ''))
  }

  realizaTratamentoInscricaoMunicipal() {
    this.setFormValue('inscricaoMunicipal',
      this.getFormValue('inscricaoMunicipal').replace(/\D/g, '').replace(/ /g, ''))
  }

  realizaTratamentoCodigoPostal(tecla: any) {

    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setFormValue('codigoPostal', Mask.cepMask(this.getFormValue('codigoPostal')));
    }

    if (this.dadosEmpresa.controls['codigoPostal'].valid && this.getFormValue('codigoPostal').length == 9) {
      this.getEnderecoPeloCepSubscription$ =
        this.brasilApiService.getEnderecoPeloCep(this.getFormValue('codigoPostal').replace('-', '')).subscribe({
          next: resposta => this.setaEnderecoComInformacoesObtidasPeloCep(resposta),
          error: error => {
            this._snackBar.open(error, "Fechar", {
              duration: 3500
            })
          },
          complete: () => console.log('Busca de endereço por cep realizada com sucesso')
        });
    }
  }

  setaEnderecoComInformacoesObtidasPeloCep(consultaCepResponse: ConsultaCepResponse) {
    this.setFormValue('logradouro', consultaCepResponse.logradouro);
    this.dadosEmpresa.controls['logradouro'].markAsTouched();

    this.setFormValue('bairro', consultaCepResponse.bairro);
    this.dadosEmpresa.controls['bairro'].markAsTouched();

    this.setFormValue('estado', consultaCepResponse.estado);
    this.dadosEmpresa.controls['estado'].markAsTouched();

    this.setFormValue('cidade', consultaCepResponse.cidade);
    this.dadosEmpresa.controls['cidade'].markAsTouched();

    this.dadosEmpresa.markAllAsTouched();
    this.obtemTodosMunicipiosPorEstado();
  }

  protected obtemTodosEstadosBrasileiros() {
    this.obtemTodosEstadosBrasileirosSubscription$ =
      this.brasilApiService.getTodosEstados().subscribe({
        next: (response: any) => {
          response.sort((x: any, y: any) => x.sigla.localeCompare(y.sigla))
          this.estadosResponse = response;
        },
        error: (error: any) => {
          this._snackBar.open(error, "Fechar", {
            duration: 3500
          });
        },
        complete: () => {
          this.geraOptionsEstado();
          console.log("Estados carregados com sucesso");
        }
      });
  }

  protected obtemTodosMunicipiosPorEstado() {

    if (Util.isNotEmptyString(this.getFormValue('estado'))) {
      this.obtemTodosMunicipiosPorEstadoSubscription$ =
        this.brasilApiService.obtemTodosMunicipiosPorEstado(this.getFormValue('estado')).subscribe({
          next: resposta => {
            this.municipiosResponse = resposta
          },
          error: error => {
            this._snackBar.open(error, 'Fechar', {
              duration: 3500
            })
          },
          complete: () => {
            this.geraOptionsMunicipio();
            this.dadosEmpresa.controls['cidade'].enable();
            console.log('Obtenção de municípios por estado realizada com sucesso');
          }
        })
    }
    else {
      this.municipiosResponse = [];
      this.setFormValue('cidade', '');
      this.dadosEmpresa.controls['cidade'].disable();
    }
  }

  verificaSePodeAvancar() {
    if (this.dadosEmpresa.invalid) {
      this.dadosEmpresa.markAllAsTouched();
      this._snackBar.open("Revise o formulário e tente novamente", "Fechar", {
        duration: 3500
      })
    }
  }

}
