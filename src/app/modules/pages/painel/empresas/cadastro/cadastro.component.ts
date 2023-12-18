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

  protected dadosEmpresa: FormGroup;
  protected dadosFiscais: FormGroup;


}
