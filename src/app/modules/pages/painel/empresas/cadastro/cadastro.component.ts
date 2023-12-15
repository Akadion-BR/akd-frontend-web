import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mask } from 'src/app/modules/utils/Mask';
import { Util } from 'src/app/modules/utils/Util';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { EmpresasService } from '../services/empresas.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cnpj } from 'src/app/modules/models/globals/cnpj';

@Component({
  selector: 'cadastro-empresa',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CadastroComponent {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private empresaService: EmpresasService) { }

  // Subscriptions
  validaDuplicidadeCnpjSubscription$: Subscription;

  protected dadosEmpresa: FormGroup = this.inicializaFormulario();

  ngOnDestroy(): void {
    if (this.validaDuplicidadeCnpjSubscription$ != undefined) this.validaDuplicidadeCnpjSubscription$.unsubscribe();
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
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70)
      ]],
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
    });
  }

  protected getValueAtributoDadosCadastrais(atributo: string): any {
    if (Util.isObjectEmpty(this.dadosEmpresa)) return null;
    return this.dadosEmpresa.controls[atributo].value;
  }

  protected setValueParaAtributoDadosCadastrais(atributo: string, valor: any) {
    this.dadosEmpresa.controls[atributo].setValue(valor);
  }

  realizaTratamentoCnpj(tecla: any) {

    if (tecla?.inputType != 'deleteContentBackward' || tecla == null) {
      this.setValueParaAtributoDadosCadastrais('cnpj', Mask.cnpjMask(this.getValueAtributoDadosCadastrais('cnpj')));
    }

    this.invocaValidacaoDuplicidadeCnpj();
  }

  invocaValidacaoDuplicidadeCnpj() {
    if (this.getValueAtributoDadosCadastrais('cnpj').length == 18 && this.dadosEmpresa.controls['cnpj'].valid) {

      this.validaDuplicidadeCnpjSubscription$ = this.empresaService.validaDuplicidadeCnpj(
        new Cnpj(this.getValueAtributoDadosCadastrais('cnpj'))).subscribe({
          error: (error: any) => {
            this.setValueParaAtributoDadosCadastrais('cnpj', '');
            this.dadosEmpresa.controls['cnpj'].reset();
            this.snackBar.open(error, "Fechar", {
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
    this.setValueParaAtributoDadosCadastrais('endpoint',
      this.getValueAtributoDadosCadastrais('endpoint').replace(/[^a-zA-Z ]/g, "").replace(/ /g, '').toLowerCase())
  }

  realizaTratamentoInscricaoEstadual() {
    this.setValueParaAtributoDadosCadastrais('inscricaoEstadual',
      this.getValueAtributoDadosCadastrais('inscricaoEstadual').replace(/\D/g, '').replace(/ /g, ''))
  }

  realizaTratamentoInscricaoMunicipal() {
    this.setValueParaAtributoDadosCadastrais('inscricaoMunicipal',
      this.getValueAtributoDadosCadastrais('inscricaoMunicipal').replace(/\D/g, '').replace(/ /g, ''))
  }

}
