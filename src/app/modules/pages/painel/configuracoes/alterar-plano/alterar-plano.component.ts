import { Component } from '@angular/core';

@Component({
  selector: 'app-alterar-plano',
  templateUrl: './alterar-plano.component.html',
  styleUrls: ['./alterar-plano.component.scss']
})
export class AlterarPlanoComponent {

  public planoSelecionado: string = 'BASIC';

  verificaSeTipoDePlanoCorrespondeAoBloco(bloco: string) {
    if (bloco == this.planoSelecionado) return true;
    else return false;
  }

  mudaPlano(novoPlano: string) {
    this.planoSelecionado = novoPlano;
  }

}
