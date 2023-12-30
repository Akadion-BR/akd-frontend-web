import { AutenticacaoService } from './../../../login/services/autenticacao.service';
import { Component } from '@angular/core';

@Component({
  selector: 'painel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private autenticacaoService: AutenticacaoService) { }

  encerrarSessao() {
    this.autenticacaoService.encerrarSessao();
  }

}
