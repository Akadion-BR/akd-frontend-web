import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { EstadosResponse } from 'src/app/shared/brasil-api/models/estados-response';
import { Router } from '@angular/router';
import { BrasilApiService } from 'src/app/shared/brasil-api/services/brasil-api.service';
import { Util } from 'src/app/modules/utils/Util';
import { MunicipiosResponse } from 'src/app/shared/brasil-api/models/municipios-response';
import { Mask } from 'src/app/modules/utils/Mask';
import { ConsultaCepResponse } from 'src/app/shared/brasil-api/models/consulta-cep-response';
import { CustomInputComponent } from 'src/app/modules/shared/inputs/custom-input/custom-input.component';

@Component({
  selector: 'app-dados-contato',
  templateUrl: './dados-contato.component.html',
  styleUrls: ['./dados-contato.component.scss']
})
export class DadosContatoComponent {

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private brasilApiService: BrasilApiService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  estadosOptions: SelectOption[];
  estadosResponse: EstadosResponse[];
  municipiosResponse: MunicipiosResponse[];
  municipiosOptions: SelectOption[];

  inputPrefixoPattern: any = /^\d{2}/;
  cepPattern: any = /^((\d{5})-(\d{3}))$/;
  inputTelefonePattern: any = /^(?:((?:9\d|[2-9])\d{3})(\d{4}))$/;
  numeroEnderecoPattern: any = /^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/;

  // Subscriptions
  obtemTodosEstadosBrasileirosSubscription$: Subscription;
  obtemTodosMunicipiosPorEstadoSubscription$: Subscription;
  getEnderecoPeloCepSubscription$: Subscription;

  // Tags HTML
  @ViewChild('inputCidade') inputCidade: CustomInputComponent;
  @ViewChild('inputPrefixo') inputPrefixo: CustomInputComponent;

  protected dadosContato: FormGroup = this.createFormDadosContato();

  @Output() emissorDeDadosContato = new EventEmitter<FormGroup>();

  dadosContatoSubscribe$: Subscription = this.dadosContato.valueChanges.pipe(
    debounceTime(500)
  ).subscribe({
    next: () => {
      this.emissorDeDadosContato.emit(this.dadosContato);
    }
  })

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.emissorDeDadosContato.emit(this.dadosContato);
    this.obtemTodosEstadosBrasileiros();
    this.inputPrefixo.acionaFoco();
  }

  ngOnDestroy(): void {
    if (this.obtemTodosEstadosBrasileirosSubscription$ != undefined) this.obtemTodosEstadosBrasileirosSubscription$.unsubscribe();
    if (this.obtemTodosMunicipiosPorEstadoSubscription$ != undefined) this.obtemTodosMunicipiosPorEstadoSubscription$.unsubscribe();
    if (this.getEnderecoPeloCepSubscription$ != undefined) this.getEnderecoPeloCepSubscription$.unsubscribe();
    if (this.dadosContatoSubscribe$ != undefined) this.dadosContatoSubscribe$.unsubscribe();
  }

  createFormDadosContato(): FormGroup {
    return this.formBuilder.group({
      prefixo: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.pattern(this.inputPrefixoPattern)
        ]
      ),
      numeroTelefone: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.pattern(this.inputTelefonePattern)
        ]
      ),
      codigoPostal: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(this.cepPattern)
        ]
      ),
      estado: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required
        ]
      ),
      cidade: new FormControl(
        {
          value: '',
          disabled: true
        },
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ),
      logradouro: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      numeroEndereco: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.pattern(this.numeroEnderecoPattern),
          Validators.required
        ]
      ),
      bairro: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ),
      complemento: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(100)
        ]
      )
    });
  }

  protected getFormValue(atributo: string): any {
    return this.dadosContato.controls[atributo].value;
  }

  protected setFormValue(atributo: string, valor: any) {
    this.dadosContato.controls[atributo].setValue(valor);
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
            this.dadosContato.controls['cidade'].enable();
            console.log('Obtenção de municípios por estado realizada com sucesso')
          }
        })
    }
    else {
      this.municipiosResponse = [];
      this.setFormValue('cidade', '');
      this.dadosContato.controls['cidade'].disable();
    }
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

  realizaTratamentoCodigoPostal(tecla: any) {

    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setFormValue('codigoPostal', Mask.cepMask(this.getFormValue('codigoPostal')));
    }

    if (this.dadosContato.controls['codigoPostal'].valid && this.getFormValue('codigoPostal').length == 9) {
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
    this.dadosContato.setValue({
      prefixo: this.getFormValue('prefixo'),
      numeroTelefone: this.getFormValue('numeroTelefone'),
      codigoPostal: this.getFormValue('codigoPostal'),
      logradouro: consultaCepResponse.logradouro,
      numeroEndereco: '',
      bairro: consultaCepResponse.bairro,
      estado: consultaCepResponse.estado,
      cidade: consultaCepResponse.cidade,
      complemento: ''
    })

    this.dadosContato.markAllAsTouched();
    this.obtemTodosMunicipiosPorEstado();
    this.inputCidade.acionaFoco();
  }

  verificaSePodeAvancar() {
    if (this.dadosContato.invalid) {
      this.dadosContato.markAllAsTouched();
      this._snackBar.open("Revise o formulário e tente novamente", "Fechar", {
        duration: 3500
      })

    }
  }

}
