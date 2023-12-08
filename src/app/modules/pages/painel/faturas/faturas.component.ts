import { Component } from '@angular/core';
import { fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'minhas-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss'], 
  animations: [fadeInOutAnimation]
})
export class FaturasComponent {

}
