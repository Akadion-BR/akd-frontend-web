import { Component } from '@angular/core';
import { fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'listagem-faturas',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'], 
  animations: [fadeInOutAnimation]
})
export class ListagemComponent {

}
