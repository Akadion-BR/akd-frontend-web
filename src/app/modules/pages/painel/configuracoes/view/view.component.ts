import { Component } from "@angular/core";
import { fadeInOutAnimation } from "src/app/shared/animations";

@Component({
  selector: 'configuracoes-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'], 
  animations: [fadeInOutAnimation]
})
export class ViewComponent {

}
