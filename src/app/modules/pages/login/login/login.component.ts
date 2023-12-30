import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/modules/models/globals/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public autenticacaoService: AutenticacaoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.isAuthenticated()) this.autenticacaoService.encerrarSessao();
  }

  realizaLogin() {

    this.autenticacaoService.realizaLogin(
      this.autenticacaoService.formLogin.get('cpf')?.value,
      this.autenticacaoService.formLogin.get('senha')?.value).subscribe(
        {
          next: (response: any) => {
            this.autenticacaoService.successfullLogin(JSON.stringify(response.headers.get('Authorization')));
          },
          error: () => {
            this.autenticacaoService.formLogin.reset();
            this._snackBar.open('Ocorreu um erro durante a sua tentativa de login. Tente novamente!', 'Fechar', {
              duration: 3500
            })
          },
          complete: () => {
            this.router.navigate(['/painel']);
            this._snackBar.open('Login realizado com sucesso', 'Fechar', {
              duration: 3500
            })
          }
        }
      )
  }

}
