import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';
import { SelectOption } from 'src/app/modules/shared/inputs/models/select-option';
import { EstadosResponse } from 'src/app/shared/brasil-api/models/estados-response';
import { Router } from '@angular/router';
import { BrasilApiService } from 'src/app/shared/brasil-api/services/brasil-api.service';
import { Util } from 'src/app/modules/utils/Util';
import { MunicipiosResponse } from 'src/app/shared/brasil-api/models/municipios-response';

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
  protected dadosContato: FormGroup = this.createFormDadosContato();

  // Subscriptions
  obtemTodosEstadosBrasileirosSubscription$: Subscription;
  obtemTodosMunicipiosPorEstadoSubscription$: Subscription;

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.obtemTodosEstadosBrasileiros();
  }

  ngOnDestroy(): void {
    if (this.obtemTodosEstadosBrasileirosSubscription$ != undefined) this.obtemTodosEstadosBrasileirosSubscription$.unsubscribe();
    if (this.obtemTodosMunicipiosPorEstadoSubscription$ != undefined) this.obtemTodosMunicipiosPorEstadoSubscription$.unsubscribe();
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
          Validators.maxLength(80)
        ]
      ),
      logradouro: new FormControl(
        {
          value: '',
          disabled: false
        },
        [
          Validators.maxLength(100)
        ]
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
          this.router.navigate(['/clientes'])
          this._snackBar.open(error, "Fechar", {
            duration: 3500
          });
        },
        complete: () => {
          this.geraOptionsEstado();
          // this.emissorDeEstados.emit(this.estadosResponse);
          console.log("Estados carregados com sucesso");
        }
      });
  }

  protected obtemTodosMunicipiosPorEstado() {

    if (Util.isNotEmptyString(this.getFormValue('estado'))) {
      this.obtemTodosMunicipiosPorEstadoSubscription$ =
        this.brasilApiService.obtemTodosMunicipiosPorEstado(this.getFormValue('estado')).subscribe({
          next: resposta => this.municipiosResponse = resposta,
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

}
